import { User } from '../User/domain/User';

export type MapUserToDomain = (object: { [key: string]: any }) => User;
