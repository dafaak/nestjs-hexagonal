import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';
import { Datasource } from '../domain/datasource';

export class MongoRepository implements UserRepository {
  constructor(private readonly dataSource: Datasource) {}

  create(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getAll(): Promise<User[]> {
    return this.dataSource.getAll();
  }

  getOneById(id: UserId): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  edit(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: UserId): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
