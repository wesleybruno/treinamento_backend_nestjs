import { RestaurantEntity } from "../entities/Restaurant.entity";
import { RestaurantRepository } from "../repository/restaurant.repository";

export class CreateRestaurantUsecase {

    private repository: RestaurantRepository;

    constructor(repository: RestaurantRepository) {
        this.repository = repository;
    }

    async execute(params: CreateRestaurantUsecaseParams): Promise<RestaurantEntity> {
        const result = await this.repository.createRestaurant(params);

        return result;
    }

}

export class CreateRestaurantUsecaseParams {
 
    description: string;

    constructor( description: string) {
        this.description = description;
    };

}