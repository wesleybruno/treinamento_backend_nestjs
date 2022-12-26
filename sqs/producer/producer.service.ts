import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class MessageProducer {
    constructor(private readonly sqsService: SqsService) { }
    async sendMessage(body: any) {

        const message: any = JSON.stringify({ body });

        try {
            await this.sqsService.send('NEW_ORDER', {
                id: '123',
                body: message,
            });
        } catch (error) {
            console.log('error in producing image!', error);
        }

    }
}
