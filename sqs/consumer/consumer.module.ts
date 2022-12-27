import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { aws_environment } from './../../src/enviroment';
import { MessageHandler } from './messageHandler';

@Module({
    imports: [
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
            useFactory: () => new MessageHandler(),
            inject: [],
        },
    ],
})
export class ConsumerModule { }