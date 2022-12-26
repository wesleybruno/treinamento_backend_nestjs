import { Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';

@Injectable()
export class MessageHandler {
    constructor() { }
    @SqsMessageHandler('NEW_ORDER', false)
    async handleMessage(message: AWS.SQS.Message) {
        console.log(message);
    }

    @SqsConsumerEventHandler('NEW_ORDER', 'processing_error')
    public onProcessingError(error: Error, message: AWS.SQS.Message) {
        console.log(error);
    }
}