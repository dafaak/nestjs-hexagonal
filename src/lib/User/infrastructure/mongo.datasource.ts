import { Datasource } from '../domain/datasource';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserMapper } from './mapper';
import { MapUserToDomain } from '../../types/map-user-to-domain';
import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserInterface } from './mongoose/schemas/user.interface';
import { CustomError } from '../domain/errors/custom.error';

export class DatasourceImpl extends Datasource {
  constructor(
    @Inject('USER_MODEL') private UserModel: Model<UserInterface>,
    private readonly userMapper: MapUserToDomain = UserMapper.mapToDomain,
  ) {
    super();
  }

  async create(user: User): Promise<void> {
    const existsEmail = await this.UserModel.findOne({
      email: user.email.value,
    });

    const existsId = await this.UserModel.findOne({ id: user.id.value });

    if (existsEmail || existsId)
      throw CustomError.badRequest('User already registered');

    await this.UserModel.create({
      id: user.id.value,
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt,
    });
  }

  async getAll(): Promise<User[]> {
    const users = await this.UserModel.find({});
    return users.map((user) => this.userMapper(user));
  }

  async getOneById(id: UserId): Promise<User | null> {
    try {
      const user = await this.UserModel.findOne({ id: id.value });

      if (!user) return null;

      return this.userMapper(user);
    } catch (e) {
      throw CustomError.internalServer('Internal server error');
    }
  }

  async edit(user: User): Promise<void> {
    const existsId = await this.UserModel.findOne({ id: user.id.value });

    if (!existsId) throw CustomError.notFound('User is not registered');

    if (user?.email?.value) {
      const existsEmail = await this.UserModel.findOne({
        email: user.email.value,
      });
      if (existsEmail) throw CustomError.badRequest('Email already registered');
    }

    const userToEdit = user.toPlainObject();

    const { id, ...updateFields } = userToEdit;

    await this.UserModel.updateOne(
      { id: user.id.value },
      { ...updateFields, updatedAt: new Date() },
    );
  }

  async delete(id: UserId): Promise<void> {
    const existsId = await this.UserModel.findOne({ id: id.value });

    if (!existsId) throw CustomError.notFound('User is not registered');
    await this.UserModel.deleteOne({ id: id.value });
  }
}
