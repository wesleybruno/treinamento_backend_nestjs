import { Module } from '@nestjs/common';
import { ProducerModule } from './../../sqs/producer/producer.module';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  imports: [ProducerModule],
  providers: []
})
export class OrderModule {}
