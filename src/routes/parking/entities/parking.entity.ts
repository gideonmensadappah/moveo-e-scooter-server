import { Location } from '../../../interfaces/Location/location';

export class Parking {
  _id: string;
  scooters_id: Array<string>;
  address: string;
  amountOfScootersAvailabile: number;
  location: Location;
}
