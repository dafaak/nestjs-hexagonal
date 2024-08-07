import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserRepository } from '../domain/UserRepository';
import { Datasource } from '../domain/datasource';

export class MongoRepository implements UserRepository {
  constructor(private readonly dataSource: Datasource) {}

  create(user: User): Promise<void> {
    return this.dataSource.create(user);
  }

  getAll(): Promise<User[]> {
    return this.dataSource.getAll();
  }

  getOneById(id: UserId): Promise<User | null> {
    return this.dataSource.getOneById(id);
  }

  edit(user: User): Promise<void> {
    return this.dataSource.edit(user);
  }

  delete(id: UserId): Promise<void> {
    return this.dataSource.delete(id);
  }
}
