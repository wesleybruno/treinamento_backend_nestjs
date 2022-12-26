import { Repository } from 'typeorm';
import { RestaurantRepository } from '../../domain/repository/restaurant.repository';
import { RestaurantEntity, RestaurantAddress } from '../../domain/entities/restaurant.entity';
import { CreateRestaurantUsecaseParams } from '../../domain/usecase/create-restaurant.usecase';

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
        const insertResult = await this.ormRepo.insert(params);

        const address = new RestaurantAddress('', '', '');
        return new RestaurantEntity(
            params.id, params.description, address
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