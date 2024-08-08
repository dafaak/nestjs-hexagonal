import { MongoRepository } from './mongo.repository';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';
import { User } from '../domain/User';

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

describe('MongoRepository', () => {
  let repository: MongoRepository;
  const mockedDataSource = {
    create: jest.fn(),
    getAll: jest.fn(),
    getOneById: jest.fn(),
    edit: jest.fn(),
    delete: jest.fn(),
  };
  beforeEach(async () => {
    repository = new MongoRepository(mockedDataSource);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should call method getAll of Datasource, and return an array of users', async () => {
    const spy = jest
      .spyOn(mockedDataSource, 'getAll')
      .mockReturnValue(mockedUsers);
    const res = await repository.getAll();
    expect(spy).toHaveBeenCalled();
    expect(res).toEqual(mockedUsers);
  });

  it('should call method getOneById of Datasource, and return the user found', async () => {
    const spy = jest
      .spyOn(mockedDataSource, 'getOneById')
      .mockReturnValue(mockedUsers[1]);
    const res = repository.getOneById(mockedUsers[1].id);

    expect(spy).toHaveBeenCalledWith(mockedUsers[1].id);
    expect(res).toEqual(mockedUsers[1]);
  });

  it('should call method create of DataSource ', async () => {
    const spy = jest.spyOn(mockedDataSource, 'create');
    await repository.create(mockedUsers[0]);
    expect(spy).toHaveBeenCalledWith(mockedUsers[0]);
  });

  it('should call method edit of DataSource', async () => {
    const spy = jest.spyOn(mockedDataSource, 'edit');
    await repository.edit(mockedUsers[0]);
    expect(spy).toHaveBeenCalledWith(mockedUsers[0]);
  });

  it('should call method delete from DataSource', async () => {
    const spy = jest.spyOn(mockedDataSource, 'delete');
    await repository.delete(mockedUsers[0].id);
    expect(spy).toHaveBeenCalledWith(mockedUsers[0].id);
  });
});
