import { OrderEntity } from "../entities/order.entity";
import { OrderRepository } from "../repository/order.repository";

export class GetOrdersByRestaurantUsecase {

    private repository: OrderRepository;

    constructor(repository: OrderRepository) {
        this.repository = repository;
    }

    async execute(id: string): Promise<OrderEntity[]> {
        return await this.repository.getOrdersByRestaurant(id);
    }

}