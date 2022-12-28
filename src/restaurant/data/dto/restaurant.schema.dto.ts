import { EntitySchema } from 'typeorm';
import { RestaurantEntity } from '../../domain/entities/restaurant.entity';

export const RestaurantSchema = new EntitySchema<RestaurantEntity>({
    name: 'restaurant',
    target: RestaurantEntity,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: "increment",
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
});
