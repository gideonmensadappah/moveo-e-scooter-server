import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUsersDto: CreateUserDto) {
    try {
      const newUser = {
        _id: new Types.ObjectId(),
        ...createUsersDto,
      };

      (await this.userModel.create(newUser)).save();

      return {
        data: newUser,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find().exec();

      return {
        msg: `This action returns all users`,
        data: users,
      };
    } catch (err) {
      return {
        msg: `This action returns error`,
        data: err,
      };
    }
  }

  async findOne(_id: Types.ObjectId) {
    try {
      const user = await this.userModel.findById(_id).exec();

      return {
        data: user,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async update(_id: Types.ObjectId, updateusersDto: UpdateUserDto) {
    try {
      const findByID = { _id };
      const updateInto = {
        $set: updateusersDto,
      };

      const updatedUser = await this.userModel.updateOne(findByID, updateInto);

      return {
        data: updatedUser.modifiedCount,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async remove(_id: Types.ObjectId) {
    try {
      const { deletedCount } = await this.userModel.deleteOne({ _id }).exec();

      return {
        data: deletedCount,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }
}
