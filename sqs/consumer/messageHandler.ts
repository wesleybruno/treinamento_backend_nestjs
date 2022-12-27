import { Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';


export class MessageHandler {
    constructor() { }
    @SqsMessageHandler(process.env.AWS_SQS_ORDER_QUEUE, false)
    async handleMessage(message: AWS.SQS.Message) {
        console.log(message);
    }

    @SqsConsumerEventHandler(process.env.AWS_SQS_ORDER_QUEUE, 'processing_error')
    public onProcessingError(error: Error, message: AWS.SQS.Message) {
        console.log(error);
    }
}