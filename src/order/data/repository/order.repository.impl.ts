import { OrderEntity } from './../../domain/entities/order.entity';
import { OrderRepository } from 'src/order/domain/repository/order.repository';
import { CreateOrderUsecaseParams } from './../../domain/usecase/create-order.usecase';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common/exceptions';

export class OrderRepositoryImpl implements OrderRepository {

    constructor(private ormRepo: Repository<OrderEntity>) { }
    async createOrder(params: CreateOrderUsecaseParams): Promise<OrderEntity> {

        const externalId = uuidv4();

        const insertResult = await this.ormRepo.insert({
            enternalId: externalId,
            description: params.description,
            restaurantId: params.restaurantId,
        });

        if (!insertResult)
            throw new BadRequestException()

        const { id } = insertResult.raw[0];


        return new OrderEntity(
            id,
            externalId,
            params.description,
            params.restaurantId
        );
    }

}