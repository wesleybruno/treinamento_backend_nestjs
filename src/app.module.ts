import { Module } from '@nestjs/common';
import { RestaurantModule } from './restaurant/restaurant.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { environment } from './enviroment';


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
        entities: [],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    RestaurantModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
