import { EntitySchema } from 'typeorm';
import { RestaurantEntity } from '../../domain/entities/restaurant.entity';

export const RestaurantSchema = new EntitySchema<RestaurantEntity>({
    name: 'restaurant',
    target: RestaurantEntity,
    columns: {
        id: {
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
