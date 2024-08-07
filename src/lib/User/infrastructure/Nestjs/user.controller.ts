import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  UserCreate,
  UserEdit,
  UserGetAll,
  UserGetOneById,
} from '../../application';
import { CustomError } from '../../domain/errors/custom.error';
import { Create } from './dtos/create.dto';
import { Edit } from './dtos/edit.dto';

@Controller('user')
export class UserController {
  constructor(
    @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
    @Inject('UserGetOneById') private readonly userGetOneById: UserGetOneById,
    @Inject('UserCreate') private readonly userCreate: UserCreate,
    @Inject('UserEdit') private readonly userEdit: UserEdit,
  ) {}

  @Get()
  async getAll() {
    try {
      return (await this.userGetAll.run()).map((item) => item.toPlainObject());
    } catch (e) {
      this.handleError(e);
    }
  }

  @Get('get-by-id')
  async getOneById(@Query('id') id: string) {
    try {
      return (await this.userGetOneById.run(id)).toPlainObject();
    } catch (e) {
      this.handleError(e);
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() user: Create) {
    try {
      return await this.userCreate.run(
        user.id,
        user.name,
        user.email,
        new Date(),
      );
    } catch (e) {
      this.handleError(e);
    }
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async editUser(@Param('id') id: string, @Body() user: Edit) {
    try {
      return await this.userEdit.run(id, user.name, user.email);
    } catch (e) {
      this.handleError(e);
    }
  }

  private handleError = (error: unknown) => {
    console.log(error); //Wiston

    if (error instanceof CustomError)
      throw new HttpException(error.message, error.statusCode);

    throw new InternalServerErrorException(error);
  };
}
