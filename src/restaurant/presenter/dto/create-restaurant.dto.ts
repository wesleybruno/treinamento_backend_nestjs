import { Length, ValidateNested, IsDefined, IsNotEmptyObject, IsObject } from "class-validator";
import { Type } from 'class-transformer';


export class CreateRestaurantAddressDto {

    @Length(10, 50)
    description: string

    @Length(0, 10)
    number: string

}

export class CreateRestaurantDto {

    @IsDefined()
    @Length(1, 50)
    id: string

    @Length(10, 50)
    description: string

    @ValidateNested()
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(() => CreateRestaurantAddressDto)
    address: CreateRestaurantAddressDto

}

