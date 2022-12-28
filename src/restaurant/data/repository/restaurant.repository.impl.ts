import { Repository } from 'typeorm';
import { RestaurantRepository } from '../../domain/repository/restaurant.repository';
import { RestaurantEntity } from '../../domain/entities/restaurant.entity';
import { CreateRestaurantUsecaseParams } from '../../domain/usecase/create-restaurant.usecase';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common/exceptions';

export class RestaurantRepositoryImpl implements RestaurantRepository {

    constructor(private ormRepo: Repository<RestaurantEntity>) { }

    async deleteRestaurant(id: string): Promise<RestaurantEntity> {

        const result = await this.ormRepo.findOne({
            where: {
                id: id
            }
        });

        const deleteResult = await this.ormRepo.delete({ id: id });

        return result;
    }
    async createRestaurant(params: CreateRestaurantUsecaseParams): Promise<RestaurantEntity> {

        const externalId = uuidv4();

        const insertResult = await this.ormRepo.insert({
            enternalId: externalId,
            description: params.description
        });

        if(!insertResult)
            throw new BadRequestException()

        const { id } = insertResult.raw[0];

        return new RestaurantEntity(
            id, externalId, params.description
        );
    }

    getAllRestaurants(): Promise<RestaurantEntity[]> {
        return this.ormRepo.find();
    }

    getRestaurantDetail(id: string): Promise<RestaurantEntity> {
        return this.ormRepo.findOne({
            where: {
                id: id
            }
        });
    }

}