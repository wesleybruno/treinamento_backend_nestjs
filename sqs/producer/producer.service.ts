import { SqsService } from '@ssut/nestjs-sqs';

export class MessageProducer {
    constructor(private readonly sqsService: SqsService) { }
    async sendMessage(body: any) {

        const message: any = JSON.stringify({ body });

        try {
            await this.sqsService.send(process.env.AWS_SQS_ORDER_QUEUE, {
                id: '123',
                body: message,
            });
        } catch (error) {
            console.log('error in producing image!', error);
        }

    }
}
