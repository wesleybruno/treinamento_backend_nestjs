import { OrderEntity } from './../../domain/entities/order.entity';
import { EntitySchema } from 'typeorm';

export const OrderSchema = new EntitySchema<OrderEntity>({
    name: 'order',
    target: OrderEntity,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: "increment",
        },
        restaurantId: {
            type: "int",
        },
        enternalId: {
            type: String,
            length: 64,
        },
        description: {
            type: String,
            length: 255,
        }
    },
    relations: {
        restaurant: {
            type: "many-to-one",
            target: "RestaurantEntity",
        },
    },
});
