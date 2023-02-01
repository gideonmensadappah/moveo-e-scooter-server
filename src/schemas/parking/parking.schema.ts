import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Location } from 'src/interfaces/Location/location';

export type ParkingDocument = Parking & Document;

@Schema({ timestamps: true })
export class Parking {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  scooters_id: Types.ObjectId[];

  @Prop()
  address: string;

  @Prop()
  amountOfScootersAvailabile: number;

  @Prop()
  location: Location;
}

export const ParkingSchema = SchemaFactory.createForClass(Parking);
