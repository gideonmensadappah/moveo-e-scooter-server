import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../../schemas/user/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUsersDto: CreateUserDto) {
    return this.authService.registerAccount(createUsersDto);
  }

  @Post('login')
  login(@Body() usersDto: Partial<User>) {
    return this.authService.login(usersDto);
  }
}
