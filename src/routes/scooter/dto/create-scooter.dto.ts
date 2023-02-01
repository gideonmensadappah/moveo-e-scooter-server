import { IsDateString, IsObject, IsEnum, IsOptional } from 'class-validator';

import { Location } from 'src/interfaces/Location/location';
import { Status } from '../enums/scooter.enums';

export class CreateScooterDto {
  @IsObject()
  currentLocation: Location;

  @IsOptional()
  model: any;

  @IsDateString()
  yearOfManufacture: Date;

  @IsEnum(Status)
  status: Status;
}
