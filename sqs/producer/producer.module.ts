import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { MessageProducer } from './producer.service';
import * as AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'ACCESS_KEY_ID',//config.ACCESS_KEY_ID,
    secretAccessKey: 'ACCESS_SECRET', //config.SECRET_ACCESS_KEY,
});


@Module({
    imports: [
        SqsModule.register({
            consumers: [],
            producers: [
                {
                    name: 'NEW_ORDER', // name of the queue 
                    queueUrl: 'http://localhost:4566/000000000000/NEW_ORDER',
                    region: 'us-east-1', // url of the queue
                },
            ],
        }),
    ],
    controllers: [],
    providers: [MessageProducer],
    exports: [MessageProducer]
})
export class ProducerModule { }