import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from 'src/schemas/user/user.schema';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtSerivce: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const projectInfo = {
      id: 1,
      username: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      password: 1,
    };
    const searchEmail = { email };

    const user = await this.userModel.findOne(searchEmail, projectInfo);
    const isValidPassowrd = await bcrypt.compare(password, user.password);

    if (!isValidPassowrd || !user) throw 'Invalid credentials!';

    delete user.password;

    return user;
  }

  async login({ email, password }: Partial<User>): Promise<any> {
    try {
      const user = await this.validateUser(email, password);

      if (!user) throw 'Invalid credentials!';
      delete user.password;

      const jwt = await this.jwtSerivce.signAsync({ user });

      return {
        data: user,
        token: jwt,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async registerAccount(user: CreateUserDto) {
    try {
      user.password = await this.hashPassword(user.password);

      (
        await this.userModel.create({
          _id: new Types.ObjectId(),
          ...user,
        })
      ).save();

      delete user.password;

      return {
        data: user,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async getUser(jwt: string) {
    try {
      const { user } = await this.jwtSerivce.verifyAsync(jwt);

      if (!user) {
        throw new UnauthorizedException();
      }
      delete user.password;

      return {
        data: user,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }
}
