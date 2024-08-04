import { Controller, Get, Inject } from '@nestjs/common';
import { UserGetAll } from '../../application';

@Controller('user')
export class UserController {
  constructor(@Inject('UserGetAll') private readonly userGetAll: UserGetAll) {}

  @Get()
  async getAll() {
    return (await this.userGetAll.run()).map((item) => item.toPlainObject());
  }
}
