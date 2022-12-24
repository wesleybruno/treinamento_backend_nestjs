import { RestaurantEntity } from "../entities/restaurant.entity";
import { CreateRestaurantUsecaseParams } from "../usecase/create-restaurant.usecase";

export interface RestaurantRepository {

    getAllRestaurants(): Promise<RestaurantEntity[]>;
    getRestaurantDetail(id: string): Promise<RestaurantEntity>;
    createRestaurant(params: CreateRestaurantUsecaseParams): Promise<RestaurantEntity>;
    deleteRestaurant(id: string): Promise<RestaurantEntity>;

}