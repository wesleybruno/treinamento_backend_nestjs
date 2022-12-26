import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { environment } from './enviroment';
import { RestaurantSchema } from './restaurant/data/dto/restaurant.schema.dto';
import { ProducerModule } from './sns/producer/producer.module';
import { ConsumerModule } from './sns/consumer/consumer.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: environment.dbHost,
        port: environment.dbPort,
        username: environment.dbUsername,
        password: environment.dbPassword,
        database: environment.dbName,
        logging: environment.logging,
        entities: [RestaurantSchema],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    RestaurantModule,
    ProducerModule,
    ConsumerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
