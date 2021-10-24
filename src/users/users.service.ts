import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
          userId: 1,
          username: 'mohammad',
          password: '123456',
        },
        {
          userId: 2,
          username: 'ali',
          password: '123345',
        },
      ];
    
      async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
      }
}
