import { SqsService } from '@ssut/nestjs-sqs';
import { aws_environment } from './../../src/enviroment';

export class MessageProducer {
    constructor(private readonly sqsService: SqsService) { }
    async sendMessage(body: any) {

        const message: any = JSON.stringify({ body });

        try {
            await this.sqsService.send(aws_environment.queueName, {
                id: '123',
                body: message,
            });
        } catch (error) {
            console.log('error in producing image!', error);
        }

    }
}
