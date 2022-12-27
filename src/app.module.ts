import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { environment } from './enviroment';
import { RestaurantSchema } from './restaurant/data/dto/restaurant.schema.dto';
import { OrderModule } from './order/order.module';
import { ProducerModule } from './../sqs/producer/producer.module';
import { ConsumerModule } from './../sqs/consumer/consumer.module';
import { AuthModule } from './auth/auth.module';
import { OrderSchema } from './order/data/dto/order.schema.dto';

const defaultModules = [
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
      entities: [RestaurantSchema, OrderSchema],
      autoLoadModels: true,
      synchronize: true,
    }),
  }),
  RestaurantModule,
  AuthModule
];

const prodModules = [
  OrderModule,
  ProducerModule,
  ConsumerModule,
]

const testModules = []

function mountImport() {
  if (environment.runningTest)
    return defaultModules.concat(testModules);

  else return defaultModules.concat(prodModules);
}

@Module({
  imports: mountImport(),
  controllers: [],
  providers: [],
})
export class AppModule { }
