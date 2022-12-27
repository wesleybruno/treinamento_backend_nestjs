import { Injectable } from '@nestjs/common';
import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { aws_environment } from './../../src/enviroment';


export class MessageHandler {
    constructor() { }
    @SqsMessageHandler(aws_environment.queueName, false)
    async handleMessage(message: AWS.SQS.Message) {
        console.log(message);
    }

    @SqsConsumerEventHandler(aws_environment.queueName, 'processing_error')
    public onProcessingError(error: Error, message: AWS.SQS.Message) {
        console.log(error);
    }
}