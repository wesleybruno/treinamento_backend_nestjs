import { Controller, Post, Body, BadRequestException, Get, Param, HttpStatus } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { MessageProducer } from './../../../../sqs/producer/producer.service';
import { CreateOrderDto } from './../../presenter/dto/create-order.dto';
import { GetOrdersByRestaurantUsecase } from 'src/order/domain/usecase/get-order-by-restaurant.usecase';

@Controller('order')
export class OrderController {

  constructor(
    private readonly messageProducer: MessageProducer,
    private getOrdersByRestaurantUsecase: GetOrdersByRestaurantUsecase,
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {

    this.messageProducer.sendMessage(createOrderDto);

    return {
      statusCode: HttpStatus.OK
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
