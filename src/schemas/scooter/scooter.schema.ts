import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from 'src/interfaces/Location/location';

import { Status } from 'src/routes/scooter/enums/scooter.enum';

export type ScooterDocument = Scooter & Document;

@Schema({ timestamps: true })
export class Scooter {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  currentLocation: Location;

  @Prop()
  model: string; // check what is this

  @Prop()
  yearOfManufacture: Date;

  @Prop()
  status: Status;
}

export const ScooterSchema = SchemaFactory.createForClass(Scooter);
