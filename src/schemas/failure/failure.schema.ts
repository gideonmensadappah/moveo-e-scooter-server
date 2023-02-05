import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { FailureStatus, Type } from 'src/routes/failure/enums/failure.enums';

export type FailureDocument = Failure & Document;

@Schema({ timestamps: true })
export class Failure {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  scooter_id: Types.ObjectId;

  @Prop()
  type: Type;

  @Prop()
  status: FailureStatus;

  @Prop()
  openingTime: Date;

  @Prop()
  closingTime: Date;
}

export const FailureSchema = SchemaFactory.createForClass(Failure);
