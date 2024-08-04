import { Datasource } from '../domain/datasource';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserMapper } from './mapper';
import { MapUserToDomain } from '../../types/map-user-to-domain';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserInterface } from './Nestjs/mongo/schemas/user.interface';
import { CustomError } from '../domain/errors/custom.error';

export class DatasourceImpl extends Datasource {
  constructor(
    @Inject('USER_MODEL') private UserModel: Model<UserInterface>,
    private readonly userMapper: MapUserToDomain = UserMapper.mapToDomain,
  ) {
    super();
  }

  create(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<User[]> {
    const users = await this.UserModel.find({});
    return users.map((user) => this.userMapper(user));
  }

  async getOneById(id: UserId): Promise<User | null> {
    try {
      const user = await this.UserModel.findOne({ _id: id.value });

      if (!user) return null;

      return this.userMapper(user);
    } catch (e) {
      throw CustomError.internalServer('Internal server error');
    }
  }

  edit(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: UserId): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
