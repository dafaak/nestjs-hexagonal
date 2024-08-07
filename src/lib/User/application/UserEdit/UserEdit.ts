import { User } from '../../domain/User';
import { UserEmail } from '../../domain/UserEmail';
import { UserId } from '../../domain/UserId';
import { UserName } from '../../domain/UserName';
import { UserRepository } from '../../domain/UserRepository';
import { CustomError } from '../../domain/errors/custom.error';

export class UserEdit {
  constructor(private repository: UserRepository) {}

  async run(id: string, name?: string, email?: string): Promise<void> {
    if (!id) throw CustomError.badRequest('Missing parameter id');

    const user = new User({
      id: new UserId(id),
      name: name ? new UserName(name) : undefined,
      email: email ? new UserEmail(email) : undefined,
    });

    return this.repository.edit(user);
  }
}
