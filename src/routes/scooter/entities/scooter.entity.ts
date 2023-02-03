import { Status } from '../enums/scooter.enum';

export class Scooter {
  _id: string;
  currentLocation: Location;
  model: any;
  yearOfManufacture: Date;
  status: Status;
}
