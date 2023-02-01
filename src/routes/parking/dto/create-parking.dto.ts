import { IsString, IsNumber } from 'class-validator';
import { Location } from 'src/interfaces/Location/location';

export class CreateParkingDto {
  @IsString()
  address: string;

  @IsNumber()
  amountOfScootersAvailabile: number;

  location: Location;
}
