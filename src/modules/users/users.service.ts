import { Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';

@Injectable()
export class UsersService {
  private _users: UserDto[] = [];

  constructor() {
    this._users = [];
  }

  createUser(user: UserDto) {
    const userExists = this._users.find((u) => u.id === user.id);
    if (userExists) {
      return false;
    }
    this._users.push(user);
    console.log(this._users);
    return true;
  }

  getUsers(start: Date, end: Date) {
    if (start && end) {
      return this._users.filter(
        (u) => u.birthDate.getTime() >= start.getTime() && u.birthDate.getTime() <= end.getTime()
      );
    } else if (start && !end) {
      return this._users.filter((u) => u.birthDate.getTime() >= start.getTime());
    } else if (!start && end) {
      return this._users.filter((u) => u.birthDate.getTime() <= end.getTime());
    } else {
      return this._users;
    }
  }

  updateUser(user: UserDto) {
    const userAdded = this.createUser(user);
    if (!userAdded) {
      const userIndex = this._users.findIndex((u) => u.id === user.id);
      this._users[userIndex] = user;
    }
    return true;
  }

  deleteUser(idUser: number) {
    const userIndex = this._users.findIndex((u) => u.id === idUser);
    if (userIndex != -1) {
      this._users.splice(userIndex, 1);
      return true;
    }
    return false;
  }
}
