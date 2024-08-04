import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export class UserGetAll {
  constructor(
    // private userModel: Model<any>
    private repository: UserRepository,
  ) {}

  async run(): Promise<User[]> {
    return this.repository.getAll();
  }
}
