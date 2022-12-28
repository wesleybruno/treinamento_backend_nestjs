import { Module } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { RestaurantModule } from './../../src/restaurant/restaurant.module';
import { DataSource } from 'typeorm';
import { ProducerModule } from './../../sqs/producer/producer.module';
import { OrderRepositoryImpl } from './data/repository/order.repository.impl';
import { OrderEntity } from './domain/entities/order.entity';
import { OrderRepository } from './domain/repository/order.repository';
import { CreateOrderUsecase } from './domain/usecase/create-order.usecase';
import { OrderController } from './presenter/controller/order.controller';
import { GetOrdersByRestaurantUsecase } from './domain/usecase/get-order-by-restaurant.usecase';

@Module({
  controllers: [OrderController],
  imports: [
    ProducerModule,
    RestaurantModule,
  ],
  providers: [
    {
      provide: OrderRepositoryImpl,
      useFactory: (datasource: DataSource) => new OrderRepositoryImpl(datasource.getRepository(OrderEntity)),
      inject: [getDataSourceToken()],
    },
    {
      provide: CreateOrderUsecase,
      useFactory(repository: OrderRepository) {
        return new CreateOrderUsecase(repository)
      },
      inject: [OrderRepositoryImpl]
    },
    {
      provide: GetOrdersByRestaurantUsecase,
      useFactory(repository: OrderRepository) {
        return new GetOrdersByRestaurantUsecase(repository)
      },
      inject: [OrderRepositoryImpl]
    },

  ]
})
export class OrderModule { }
