import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import spyOn = jest.spyOn;
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserEmail } from '../../domain/UserEmail';

const mockedUsers = [
  {
    id: 'test_user_1',
    name: 'Israel Perez',
    email: 'israel.pe@outlook.es',
    createdAt: '2024-08-07T20:24:18.134Z',
    updatedAt: '2024-08-07T20:31:25.993Z',
  },
  {
    id: 'test_user_2',
    name: 'Jose Espinosa',
    email: 'jose.es@outlook.es',
    createdAt: '2024-08-07T20:31:48.166Z',
    updatedAt: undefined,
  },
];

describe('UserController', () => {
  let controller: UserController;
  const mockUserGetAll = {
    run: jest.fn(),
  };
  const mockUserGetOneById = {
    run: jest.fn(),
  };

  const mockUserCreate = {
    run: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'UserGetAll',
          useValue: mockUserGetAll,
        },
        {
          provide: 'UserGetOneById',
          useValue: mockUserGetOneById,
        },
        {
          provide: 'UserCreate',
          useValue: mockUserCreate,
        },
        {
          provide: 'UserEdit',
          useFactory: () => {
            run: jest.fn(
              (id: string, name?: string, email?: string) => Promise<void>,
            );
          },
        },
        {
          provide: 'UserDelete',
          useFactory: () => {
            run: jest.fn((id: string) => Promise<void>);
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call method "run" of userGetAll usecase, and return an array of users', async () => {
    const user = new User({
      id: new UserId(mockedUsers[1].id),
      name: new UserName(mockedUsers[1].name),
      email: new UserEmail(mockedUsers[1].email),
      createdAt: new Date(mockedUsers[1].createdAt),
    });
    const users = [user];
    jest.spyOn(mockUserGetAll, 'run').mockReturnValue(users);

    const res = await controller.getAll();
    expect(res).toEqual([mockedUsers[1]]);
    expect(mockUserGetAll.run).toHaveBeenCalled();
  });

  it('should call method "run" of userGetOneById use case, and return the user found', async () => {
    const searchId = mockedUsers[0].id;
    const user = new User({
      id: new UserId(mockedUsers[0].id),
      name: new UserName(mockedUsers[0].name),
      email: new UserEmail(mockedUsers[0].email),
      createdAt: new Date(mockedUsers[0].createdAt),
      updatedAt: new Date(mockedUsers[0].updatedAt),
    });
    jest.spyOn(mockUserGetOneById, 'run').mockReturnValue(user);

    const res = await controller.getOneById(searchId);

    expect(mockUserGetOneById.run).toHaveBeenCalledWith(searchId);
    expect(res).toEqual(mockedUsers[0]);
  });

  it('should call method "run" of userCreate usecase', async () => {
    const { createdAt, updatedAt, ...userToCreate } = mockedUsers[1];
    jest.spyOn(mockUserCreate, 'run');

    await controller.createUser(userToCreate);
    expect(mockUserCreate.run).toHaveBeenCalledWith(
      ...Object.values(userToCreate),
    );
  });
});
