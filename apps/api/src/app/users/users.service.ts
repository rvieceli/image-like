import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND
      );
    }

    return user;
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        'User with this id does not exist',
        HttpStatus.NOT_FOUND
      );
    }

    return user;
  }

  async getByIds(ids: string[]) {
    return this.usersRepository.find({ where: { id: In(ids) } });
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(user);

    await this.usersRepository.save(newUser);

    return newUser;
  }
}
