import { Controller, Post, Body } from '@nestjs/common';
import { MessageProducer } from 'sqs/producer/producer.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly messageProducer: MessageProducer) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    
    this.messageProducer.sendMessage({
      message: 'new_message',
    });

    return 'OK';
  }

}
