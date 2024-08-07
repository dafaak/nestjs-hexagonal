import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from './provider/database.module';
import { userProviders } from '../mongoose/user.provider';
import {
  UserCreate,
  UserEdit,
  UserGetAll,
  UserGetOneById,
} from '../../application';
import { Model } from 'mongoose';
import { Datasource } from '../../domain/datasource';
import { MongoRepository } from '../mongo.repository';
import { UserRepository } from '../../domain/UserRepository';
import { DatasourceImpl } from '../mongo.datasource';
import { UserInterface } from '../mongoose/schemas/user.interface';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    {
      provide: 'DatasourceImpl',
      useFactory: (userModel: Model<UserInterface>) =>
        new DatasourceImpl(userModel),
      inject: ['USER_MODEL'],
    },
    {
      provide: 'MongoRepository',
      useFactory: (dataSource: Datasource) => new MongoRepository(dataSource),
      inject: ['DatasourceImpl'],
    },
    {
      provide: 'UserGetAll',
      useFactory: (repository: UserRepository) => new UserGetAll(repository),
      inject: ['MongoRepository'],
    },
    {
      provide: 'UserGetOneById',
      useFactory: (repository: UserRepository) =>
        new UserGetOneById(repository),
      inject: ['MongoRepository'],
    },
    {
      provide: 'UserCreate',
      useFactory: (repository: UserRepository) => new UserCreate(repository),
      inject: ['MongoRepository'],
    },
    {
      provide: 'UserEdit',
      useFactory: (repository: UserRepository) => new UserEdit(repository),
      inject: ['MongoRepository'],
    },
  ],
})
export class UserModule {}
