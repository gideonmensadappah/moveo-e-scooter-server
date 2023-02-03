import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { Scooter } from 'src/schemas/scooter/scooter.schema';
import { Status } from './enums/scooter.enum';

@Injectable()
export class ScootersService {
  constructor(
    @InjectModel(Scooter.name) private readonly scooterModel: Model<Scooter>,
  ) {}

  async create(createScooterDto: CreateScooterDto) {
    try {
      (
        await this.scooterModel.create({
          _id: new Types.ObjectId(),
          ...createScooterDto,
        })
      ).save();

      return {
        data: 'inserted into db!',
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async findAll() {
    try {
      const scooters = await this.scooterModel.find().exec();

      return {
        data: scooters,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async findOne(_id: Types.ObjectId) {
    try {
      const scooter = await this.scooterModel.findById(_id).exec();

      return {
        data: scooter,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async findByStatus(status: Status) {
    try {
      const scooters = await this.scooterModel.find({ status }).exec();

      return {
        data: scooters,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async update(_id: Types.ObjectId, updateParkingDto: UpdateScooterDto) {
    try {
      const findByID = { _id };
      const updateInto = {
        $set: updateParkingDto,
      };

      const updated = await this.scooterModel.updateOne(findByID, updateInto);
      const { modifiedCount } = updated;

      return {
        data: modifiedCount,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async remove(_id: Types.ObjectId) {
    try {
      const deleted = await this.scooterModel.deleteOne({ _id }).exec();
      const { deletedCount } = deleted;

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
