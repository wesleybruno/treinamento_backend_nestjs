import { OrderEntity } from './../../domain/entities/order.entity';
import { EntitySchema } from 'typeorm';

export const OrderSchema = new EntitySchema<OrderEntity>({
    name: 'order',
    target: OrderEntity,
    columns: {
        id: {
            type: String,
            primary: true,
            length: 16,
        },
        restaurantId: {
            type: String,
            primary: true,
            length: 16,
        },
        description: {
            type: String,
            length: 255,
        }
    },
});
