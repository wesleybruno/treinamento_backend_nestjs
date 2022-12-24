import { RestaurantEntity } from "../entities/restaurant.entity";
import { RestaurantRepository } from "../repository/restaurant.repository";

export class GetAllRestaurantsUsecase {

    private repository: RestaurantRepository;

    constructor(repository: RestaurantRepository) {
        this.repository = repository;
    }

    async execute(): Promise<RestaurantEntity[]> {
        return await this.repository.getAllRestaurants();
    }

}