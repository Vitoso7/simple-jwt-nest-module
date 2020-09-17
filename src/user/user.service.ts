import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  //async create(data: RegisterUserDto): Promise<IUsers> {
  //  const { username, password, email } = data;
  //
  //  // check if the user exists in the db
  //  const userInDb = await this.userRepository.findOne({ where: { username } });
  //  if (userInDb) {
  //    throw new HttpException(
  //      'Username already exists',
  //      HttpStatus.BAD_REQUEST,
  //    );
  //  }
  //
  //  const createdUser = new this.userRepository(data);
  //  await createdUser.save();
  //}
}
