import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(ValidationPipe) credentials: RegisterUserDto): any {
    return this.authService.register(credentials);
  }

  @Post('login')
  login(@Body(ValidationPipe) credentials: LoginDto): any {
    return this.authService.login(credentials);
  }
}
