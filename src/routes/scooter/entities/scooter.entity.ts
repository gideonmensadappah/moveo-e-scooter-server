import { Status } from '../enums/scooter.enums';

export class Scooter {
  _id: string;
  currentLocation: Location;
  model: any;
  yearOfManufacture: Date;
  status: Status;
}
