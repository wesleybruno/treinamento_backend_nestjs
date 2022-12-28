import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { CreateOrderUsecase } from 'src/order/domain/usecase/create-order.usecase';
import { OrderModule } from 'src/order/order.module';
import { aws_environment } from './../../src/enviroment';
import { MessageHandler } from './messageHandler';

@Module({
    imports: [
        OrderModule,
        SqsModule.register({
            consumers: [
                {
                    name: aws_environment.queueName,
                    queueUrl: aws_environment.hostQueueName,
                    region: aws_environment.region,
                },
            ],
            producers: [],
        }),
    ],
    controllers: [],
    providers: [
        {
            provide: MessageHandler,
            useFactory: (usecase: CreateOrderUsecase) => new MessageHandler(usecase),
            inject: [CreateOrderUsecase],
        },
    ],
})
export class ConsumerModule { }