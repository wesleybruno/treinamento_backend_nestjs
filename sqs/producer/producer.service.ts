import { SqsService } from '@ssut/nestjs-sqs';
import { aws_environment } from './../../src/enviroment';
import { v4 as uuidv4 } from 'uuid';

export class MessageProducer {
    constructor(private readonly sqsService: SqsService) { }
    async sendMessage(body: any) {

        try {

            const message: any = JSON.stringify({ body });

            await this.sqsService.send(aws_environment.queueName, {
                id: uuidv4(),
                body: message,
            });
        } catch (error) {
            console.log('error in producing image!', error);
        }

    }
}
