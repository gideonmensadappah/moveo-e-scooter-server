import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../../schemas/user/user.schema';
import { Response, Request } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUsersDto: CreateUserDto) {
    return this.authService.registerAccount(createUsersDto);
  }

  @Post('login')
  async login(
    @Body() usersDto: Partial<User>,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { data, token } = await this.authService.login(usersDto);
    response.cookie('jwt', token, { httpOnly: true });

    return { data };
  }

  @Get('logout')
  async logout(
    @Res({ passthrough: true })
    response: Response,
  ) {
    response.clearCookie('jwt', { httpOnly: true });

    return { data: 'success' };
  }

  @Get('user')
  user(@Req() request: Request) {
    const jwt = request.cookies?.jwt;
    if (!jwt) throw new UnauthorizedException();

    const { data: userJwt } = request.cookies?.jwt;

    return this.authService.getUser(userJwt);
  }
}
