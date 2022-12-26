import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageHandler } from './messageHandler';
import * as AWS from 'aws-sdk';


AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'ACCESS_KEY_ID',//config.ACCESS_KEY_ID,
    secretAccessKey: 'ACCESS_SECRET', //config.SECRET_ACCESS_KEY,
});
@Module({
    imports: [
        SqsModule.register({
            consumers: [
                {
                    name: 'NEW_ORDER', // name of the queue 
                    queueUrl: 'http://localhost:4566/000000000000/NEW_ORDER', // the url of the queue
                    region: 'us-east-1',
                },
            ],
            producers: [],
        }),
    ],
    controllers: [],
    providers: [MessageHandler],
})
export class ConsumerModule { }