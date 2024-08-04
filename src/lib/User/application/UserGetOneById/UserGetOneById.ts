import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserRepository } from '../../domain/UserRepository';
import { CustomError } from '../../domain/errors/custom.error';

export class UserGetOneById {
  constructor(private repository: UserRepository) {}

  async run(id: string): Promise<User> {
    if (!id) throw CustomError.badRequest('Missing parameter id');

    const user = await this.repository.getOneById(new UserId(id));

    if (!user) throw CustomError.notFound('User not found');

    return user;
  }
}
