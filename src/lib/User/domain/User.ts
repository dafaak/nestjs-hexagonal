import { UserCreatedAt } from './UserCreatedAt';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  id: UserId;
  name: UserName;
  email: UserEmail;
  createdAt: UserCreatedAt;

  constructor(user: {
    id: UserId;
    name: UserName;
    email: UserEmail;
    createdAt: UserCreatedAt;
  }) {
    const { id, name, email, createdAt } = user;

    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  // estás funciones se llaman servicio de dominio
  public nameAndEmail() {
    return `${this.name} - ${this.email}`;
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      createdAt: this.createdAt.value,
    };
  }
}
