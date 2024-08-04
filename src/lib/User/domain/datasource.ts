import { User } from './User';
import { UserId } from './UserId';

export abstract class Datasource {
  abstract create(user: User): Promise<void>;

  abstract getAll(): Promise<User[]>;

  abstract getOneById(id: UserId): Promise<User | null>;

  abstract edit(user: User): Promise<void>;

  abstract delete(id: UserId): Promise<void>;
}
