import { IsString, IsEnum, IsDateString } from 'class-validator';

import { FailureStatus, Type } from '../enums/failure.enums';

export class CreateFailureDto {
  @IsString()
  scooter_id: string;

  @IsEnum(Type)
  type: Type;

  @IsEnum(FailureStatus)
  status: FailureStatus;

  @IsDateString()
  openingTime: Date;

  @IsDateString()
  closingTime: Date;
}
