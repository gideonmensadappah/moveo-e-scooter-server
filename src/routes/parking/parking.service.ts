import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from 'src/schemas/parking/parking.schema';
import { caclParkingAvailabilities } from 'src/aggregations/parking/caclAvailabilityStage';

@Injectable()
export class ParkingsService {
  constructor(
    @InjectModel(Parking.name) private readonly parkingModel: Model<Parking>,
  ) {}
  async create(createParkingDto: CreateParkingDto) {
    try {
      const newParking = {
        _id: new Types.ObjectId(),
        ...createParkingDto,
      };

      await (await this.parkingModel.create(newParking)).save();

      return {
        data: newParking,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async findAll() {
    try {
      const parkings = await this.parkingModel.find().exec();

      return {
        data: parkings,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async findAllParkingAvailabilities() {
    try {
      const parkings = await this.parkingModel.aggregate(
        caclParkingAvailabilities,
      );

      return {
        data: parkings,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async findOne(_id: Types.ObjectId) {
    try {
      const parking = await this.parkingModel.findById(_id).exec();

      return {
        data: parking,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async update(_id: Types.ObjectId, updateParkingDto: UpdateParkingDto) {
    try {
      const findByID = { _id };
      const updateInto = {
        $set: updateParkingDto,
      };

      const updated = await this.parkingModel.updateOne(findByID, updateInto);
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
      const deleted = await this.parkingModel.deleteOne({ _id }).exec();
      const { deletedCount } = deleted;

      return {
        data: _id,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }
}
