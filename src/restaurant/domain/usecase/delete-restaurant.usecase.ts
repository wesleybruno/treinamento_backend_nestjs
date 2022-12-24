import { RestaurantEntity } from "../entities/restaurant.entity";
import { RestaurantRepository } from "../repository/restaurant.repository";

export class DeleteRestaurantUsecase {

    private repository: RestaurantRepository;

    constructor(repository: RestaurantRepository) {
        this.repository = repository;
    }

    async execute(id: string): Promise<RestaurantEntity> {
        return await this.repository.deleteRestaurant(id);
    }

}