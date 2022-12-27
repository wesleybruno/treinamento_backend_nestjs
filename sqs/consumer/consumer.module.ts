import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './messageHandler';

@Module({
    imports: [
        SqsModule.register({
            consumers: [
                {
                    name: process.env.AWS_SQS_ORDER_QUEUE,
                    queueUrl: process.env.AWS_HOST_QUEUE,
                    region: process.env.AWS_DEFAULT_REGION,
                },
            ],
            producers: [],
        }),
    ],
    controllers: [],
    providers: [
        {
            provide: MessageHandler,
            useFactory: () => new MessageHandler(),
            inject: [],
        },
    ],
})
export class ConsumerModule { }