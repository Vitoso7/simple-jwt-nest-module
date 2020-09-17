import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';

import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(credentials: RegisterUserDto): Promise<any> {
    try {
      const newUser = new UserEntity();
      Object.assign(newUser, credentials);

      await this.userRepository.save(newUser);
      // const payload = { username: user.username };
      // const token = this.jwtService.sign(payload);
      // return {user: {...user.toJSON(), token}};
      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException([err.detail]);
      }
      throw new InternalServerErrorException();
    }
  }

  async login({ email, password }: LoginDto): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      const isValid = await user.comparePassword(password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = { username: user.username };
      const token = this.jwtService.sign(payload);
      return { user: { ...user.toJSON(), token } };
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials 2');
    }
  }
}
