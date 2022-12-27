import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageProducer } from './producer.service';
import { SqsService } from '@ssut/nestjs-sqs';

@Module({
    imports: [
        SqsModule.register({
            consumers: [],
            producers: [
                {
                    name: process.env.AWS_SQS_ORDER_QUEUE,
                    queueUrl: process.env.AWS_HOST_QUEUE,
                    region: process.env.AWS_DEFAULT_REGION,
                },
            ],
        }),
    ],
    controllers: [],
    providers: [
        {
            provide: MessageProducer,
            useFactory: (sqsService: SqsService) => new MessageProducer(sqsService),
            inject: [SqsService],
        },
    ],
    exports: [MessageProducer]
})
export class ProducerModule { }