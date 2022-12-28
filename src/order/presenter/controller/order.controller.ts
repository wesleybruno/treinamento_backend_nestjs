import { Controller, Post, Body, BadRequestException, Get, Param, HttpStatus } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateOrderUsecase, CreateOrderUsecaseParams } from './../../domain/usecase/create-order.usecase';
import { GetRestaurantDetailUsecase } from './../../../restaurant/domain/usecase/get-restaurant-detail.usecase';
import { MessageProducer } from './../../../../sqs/producer/producer.service';
import { CreateOrderDto } from './../../presenter/dto/create-order.dto';
import { GetOrdersByRestaurantUsecase } from 'src/order/domain/usecase/get-order-by-restaurant.usecase';
import { ForeignKeyFailure } from 'src/core/failures/failures';

@Controller('order')
export class OrderController {

  constructor(
    private readonly messageProducer: MessageProducer,
    private getRestaurantDetailUsecase: GetRestaurantDetailUsecase,
    private createOrderUsecase: CreateOrderUsecase,
    private getOrdersByRestaurantUsecase: GetOrdersByRestaurantUsecase,
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const params = new CreateOrderUsecaseParams(
        createOrderDto.restaurantId,
        createOrderDto.description
      );

      const resultOrder = await this.createOrderUsecase.execute(params);
      if (!resultOrder)
        throw new BadRequestException();

      this.messageProducer.sendMessage(resultOrder);

      return {
        ...resultOrder
      }
    } catch (error) {
      if (error instanceof ForeignKeyFailure)
        throw new NotFoundException()

    }

  }


  @Get('/restaurant/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.getOrdersByRestaurantUsecase.execute(id);

    if (result == null)
      throw new NotFoundException();

    return {
      result,
      statusCode: HttpStatus.OK
    }

  }

}
