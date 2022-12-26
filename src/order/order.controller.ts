import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor() { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return 'OK';
  }

}
