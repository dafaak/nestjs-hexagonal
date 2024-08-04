import { Controller, Get, HttpException, Inject, Query } from '@nestjs/common';
import { UserGetAll, UserGetOneById } from '../../application';
import { CustomError } from '../../domain/errors/custom.error';

@Controller('user')
export class UserController {
  constructor(
    @Inject('UserGetAll') private readonly userGetAll: UserGetAll,
    @Inject('UserGetOneById') private readonly userGetOneById: UserGetOneById,
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

  private handleError = (error: unknown) => {
    if (error instanceof CustomError)
      throw new HttpException(error.message, error.statusCode);
    console.log(error); //Wiston
    return error;
  };
}
