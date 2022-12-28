import { SqsMessageHandler, SqsConsumerEventHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { aws_environment } from './../../src/enviroment';
import { CreateOrderUsecase, CreateOrderUsecaseParams } from './../../src/order/domain/usecase/create-order.usecase';
import { ForeignKeyFailure } from 'src/core/failures/failures';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { CreateOrderDto } from 'src/order/presenter/dto/create-order.dto';


export class MessageHandler {

    constructor(
        private createOrderUsecase: CreateOrderUsecase,
    ) { }

    @SqsMessageHandler(aws_environment.queueName, false)
    async handleMessage(message: AWS.SQS.Message) {
        try {

            console.log(message);

            const { restaurantId, description } = JSON.parse(message.Body).body as CreateOrderDto;


            const params = new CreateOrderUsecaseParams(
                restaurantId,
                description
            );

            const resultOrder = await this.createOrderUsecase.execute(params);
            if (!resultOrder)
                throw new BadRequestException();

            return {
                ...resultOrder
            }
        } catch (error) {
            if (error instanceof ForeignKeyFailure)
                throw new NotFoundException()

        }
    }

    @SqsConsumerEventHandler(aws_environment.queueName, 'processing_error')
    public onProcessingError(error: Error, message: AWS.SQS.Message) {
        console.log(error);
    }
}