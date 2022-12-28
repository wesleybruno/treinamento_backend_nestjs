import { OrderEntity } from "./../entities/order.entity";
import { CreateOrderUsecaseParams } from "../usecase/create-order.usecase";

export interface OrderRepository {
    createOrder(params: CreateOrderUsecaseParams): Promise<OrderEntity>;
    getOrdersByRestaurant(restaurantId: string): Promise<OrderEntity[]>;
}