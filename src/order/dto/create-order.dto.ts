import { Length, IsDefined } from "class-validator";

export class CreateOrderDto {
    @IsDefined()
    @Length(1, 50)
    restaurantId: string

    @Length(10, 50)
    description: string

}
