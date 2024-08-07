import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserName } from './UserName';

export class User {
  id: UserId;
  name?: UserName;
  email?: UserEmail;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: {
    id: UserId;
    name?: UserName;
    email?: UserEmail;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    const { id, name, email, createdAt, updatedAt } = user;

    this.id = id;
    if (name) this.name = name;
    if (email) this.email = email;
    if (createdAt) this.createdAt = createdAt;
    if (updatedAt) this.updatedAt = updatedAt;
  }

  // estás funciones se llaman servicio de dominio
  public nameAndEmail() {
    return `${this.name} - ${this.email}`;
  }

  public toPlainObject() {
    return {
      id: this.id.value,
      name: this.name?.value,
      email: this.email?.value,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    };
  }
}
