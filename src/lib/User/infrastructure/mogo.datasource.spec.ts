import { DatasourceImpl } from './mongo.datasource';
import { UserInterface } from './mongoose/schemas/user.interface';
import { Model } from 'mongoose';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';

const mockedUsers: User[] = [
  new User({
    id: new UserId('test_user_1'),
    name: new UserName('Israel Perez'),
    email: new UserEmail('israel.pe@outlook.es'),
  }),
  new User({
    id: new UserId('test_user_2'),
    name: new UserName('Jose Espinosa'),
    email: new UserEmail('jose.es@outlook.es'),
  }),
];

describe('Mongo DataSource', () => {
  let dataSource: DatasourceImpl;
  const mockedUserModel = {
    findOne: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };
  beforeEach(() => {
    dataSource = new DatasourceImpl(
      mockedUserModel as unknown as Model<UserInterface>,
    );
  });

  it('should be defined', () => {
    expect(dataSource).toBeDefined();
  });

  it('should insert a new user ', async () => {
    const spyFindOne = jest.spyOn(mockedUserModel, 'findOne');
    const spyCreate = jest.spyOn(mockedUserModel, 'create');

    await dataSource.create(mockedUsers[0]);

    expect(spyFindOne).toHaveBeenCalledTimes(2);
    expect(spyCreate).toHaveBeenCalledTimes(1);
  });
});
