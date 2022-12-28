import { OrderEntity } from "./../entities/order.entity";
import { OrderRepository } from "../repository/order.repository";

export class CreateOrderUsecase {

    private repository: OrderRepository;

    constructor(repository: OrderRepository) {
        this.repository = repository;
    }

    async execute(params: CreateOrderUsecaseParams): Promise<OrderEntity> {
        const result = await this.repository.createOrder(params);

        return result;
    }

}

export class CreateOrderUsecaseParams {

    restaurantId: string;
    description: string;

    constructor(restaurantId: string, description: string) {
        this.restaurantId = restaurantId;
        this.description = description;
    };

}