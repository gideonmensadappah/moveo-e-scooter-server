import { Injectable } from '@nestjs/common';
import { CreateFailureDto } from './dto/create-failure.dto';
import { UpdateFailureDto } from './dto/update-failure.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Failure } from 'src/schemas/failure/failure.schema';
import { Model, Types } from 'mongoose';
import { FailureStatus } from './enums/failure.enums';

@Injectable()
export class FailuresService {
  constructor(
    @InjectModel(Failure.name) private readonly failureModel: Model<Failure>,
  ) {}
  async create(createFailureDto: CreateFailureDto) {
    try {
      const createFailure: Failure = {
        ...createFailureDto,
        scooter_id: new Types.ObjectId(createFailureDto.scooter_id),
        _id: new Types.ObjectId(),
      };

      await (await this.failureModel.create(createFailure)).save();

      return {
        data: createFailure,
      };
    } catch (err) {
      return {
        data: err,
      };
    }
  }

  async findAll() {
    try {
      const failures = await this.failureModel.find().exec();

      return {
        msg: `This action returns all failures`,
        data: failures,
      };
    } catch (err) {
      return {
        msg: `This action returned error`,
        data: err,
      };
    }
  }

  async findOne(_id: Types.ObjectId) {
    try {
      const failures = await this.failureModel.findById(_id).exec();

      return {
        data: failures,
      };
    } catch (err) {
      return {
        msg: `This action returned error`,
        data: err,
      };
    }
  }

  async findByStatus(status: FailureStatus) {
    try {
      const failures = await this.failureModel.find({ status }).exec();

      return {
        msg: `This action returns all failures`,
        data: failures,
      };
    } catch (err) {
      return {
        msg: `This action returned error`,
        data: err,
      };
    }
  }

  async update(_id: Types.ObjectId, updateFailureDto: UpdateFailureDto) {
    try {
      const findByID = { _id };
      const updateInto = {
        $set: updateFailureDto,
      };

      const updatedFailure = await this.failureModel.updateOne(
        findByID,
        updateInto,
      );

      const { modifiedCount } = updatedFailure;

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
      const { deletedCount } = await this.failureModel
        .deleteOne({ _id })
        .exec();

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
