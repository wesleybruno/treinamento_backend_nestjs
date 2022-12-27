import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RestaurantSchema } from './data/dto/restaurant.schema.dto';
import { RestaurantRepositoryImpl } from './data/repository/restaurant.repository.impl';
import { RestaurantEntity } from './domain/entities/restaurant.entity';
import { RestaurantRepository } from './domain/repository/restaurant.repository';
import { CreateRestaurantUsecase } from './domain/usecase/create-restaurant.usecase';
import { DeleteRestaurantUsecase } from './domain/usecase/delete-restaurant.usecase';
import { GetAllRestaurantsUsecase } from './domain/usecase/get-all-restaurant.usecase';
import { GetRestaurantDetailUsecase } from './domain/usecase/get-restaurant-detail.usecase';
import { RestaurantController } from './presenter/controller/restaurant.controller';

@Module({
  controllers: [RestaurantController],
  imports: [
    TypeOrmModule.forFeature([RestaurantSchema])
  ],
  providers: [
    {
      provide: RestaurantRepositoryImpl,
      useFactory: (datasource: DataSource) => new RestaurantRepositoryImpl(datasource.getRepository(RestaurantEntity)),
      inject: [getDataSourceToken()],
    },
    {
      provide: DeleteRestaurantUsecase,
      useFactory(repository: RestaurantRepository) {
        return new DeleteRestaurantUsecase(repository)
      },
      inject: [RestaurantRepositoryImpl]
    },
    {
      provide: CreateRestaurantUsecase,
      useFactory(repository: RestaurantRepository) {
        return new CreateRestaurantUsecase(repository)
      },
      inject: [RestaurantRepositoryImpl]
    },
    {
      provide: GetAllRestaurantsUsecase,
      useFactory(repository: RestaurantRepository) {
        return new GetAllRestaurantsUsecase(repository)
      },
      inject: [RestaurantRepositoryImpl]
    },
    {
      provide: GetRestaurantDetailUsecase,
      useFactory(repository: RestaurantRepository) {
        return new GetRestaurantDetailUsecase(repository)
      },
      inject: [RestaurantRepositoryImpl]
    }
  ],
  exports: [
    GetRestaurantDetailUsecase
  ]
})
export class RestaurantModule {}
