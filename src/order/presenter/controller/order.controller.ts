import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateOrderUsecase, CreateOrderUsecaseParams } from './../../domain/usecase/create-order.usecase';
import { GetRestaurantDetailUsecase } from './../../../restaurant/domain/usecase/get-restaurant-detail.usecase';
import { MessageProducer } from './../../../../sqs/producer/producer.service';
import { CreateOrderDto } from './../../presenter/dto/create-order.dto';

@Controller('order')
export class OrderController {

  constructor(
    private readonly messageProducer: MessageProducer,
    private getRestaurantDetailUsecase: GetRestaurantDetailUsecase,
    private createOrderUsecase: CreateOrderUsecase,
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {

    const result = await this.getRestaurantDetailUsecase.execute(createOrderDto.restaurantId);

    if (!result)
      throw new NotFoundException();

    const params = new CreateOrderUsecaseParams(
      '1234',
      createOrderDto.restaurantId,
      createOrderDto.description
    );

    const resultOrder = await this.createOrderUsecase.execute(params);
    if (!resultOrder)
      throw new BadRequestException();

    this.messageProducer.sendMessage({
      message: 'new_message',
    });

    return {
      ...resultOrder
    }
  }

}
