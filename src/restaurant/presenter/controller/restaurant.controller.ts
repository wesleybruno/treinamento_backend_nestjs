import { Controller, Get, Post, Body, NotFoundException, HttpStatus, Param, Delete } from '@nestjs/common';
import { GetAllRestaurantsUsecase } from './../../domain/usecase/get-all-restaurant.usecase';
import { CreateRestaurantDto } from '../dto/create-restaurant.dto';
import { GetRestaurantDetailUsecase } from './../../domain/usecase/get-restaurant-detail.usecase';
import { CreateRestaurantUsecase, CreateRestaurantUsecaseParams } from './../../domain/usecase/create-restaurant.usecase';
import { DeleteRestaurantUsecase } from './../../domain/usecase/delete-restaurant.usecase';


@Controller('restaurant')
export class RestaurantController {

  constructor(
    private getAllRestaurantsUsecase: GetAllRestaurantsUsecase,
    private getRestaurantDetailUsecase: GetRestaurantDetailUsecase,
    private createRestaurantUsecase: CreateRestaurantUsecase,
    private deleteRestaurantUsecase: DeleteRestaurantUsecase,
  ) { }

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {

    return this.createRestaurantUsecase.execute(
      new CreateRestaurantUsecaseParams(createRestaurantDto.id, createRestaurantDto.description)
    );
  }

  @Get()
  async findAll() {
    const result = await this.getAllRestaurantsUsecase.execute();

    return {
      result,
      statusCode: HttpStatus.OK
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.getRestaurantDetailUsecase.execute(id);

    if (result == null)
      throw new NotFoundException();


    return {
      result,
      statusCode: HttpStatus.OK
    }

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteRestaurantUsecase.execute(
      id,
    );
  }
}
