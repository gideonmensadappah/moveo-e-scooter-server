import { FailureStatus, Type } from '../enums/failure.enums';

export class Failure {
  _id: string;
  scooter_id: string;
  type: Type;
  status: FailureStatus;
  openingTime: Date;
  closingTime: Date;
}
