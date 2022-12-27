import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageProducer } from './producer.service';
import { SqsService } from '@ssut/nestjs-sqs';
import { aws_environment } from './../../src/enviroment';

@Module({
    imports: [
        SqsModule.register({
            consumers: [],
            producers: [
                {
                    name: aws_environment.queueName,
                    queueUrl: aws_environment.hostQueueName,
                    region: aws_environment.region,
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