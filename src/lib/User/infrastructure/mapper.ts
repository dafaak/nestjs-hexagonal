import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';

export class UserMapper {
  static mapToDomain(object: { [key: string]: any }): User {
    const { id, _id, name, email, createdAt, updatedAt } = object;

    if (!id || !_id) throw Error('Missing id');
    if (!name) throw Error('Missing name');
    if (!email) throw Error('Missing email');
    if (!createdAt) throw Error('Missing password');

    return new User({
      id: new UserId(id || _id),
      name: new UserName(name),
      email: new UserEmail(email),
      createdAt: createdAt,
      updatedAt: updatedAt,
    });
  }
}
