import { OrderEntity } from './../../domain/entities/order.entity';
import { OrderRepository } from 'src/order/domain/repository/order.repository';
import { CreateOrderUsecaseParams } from './../../domain/usecase/create-order.usecase';
import { Repository } from 'typeorm';

export class OrderRepositoryImpl implements OrderRepository {

    constructor(private ormRepo: Repository<OrderEntity>) { }
    async createOrder(params: CreateOrderUsecaseParams): Promise<OrderEntity> {
        const insertResult = await this.ormRepo.insert(params);

        return new OrderEntity(
            params.id, params.description, params.restaurantId
        );
    }

}