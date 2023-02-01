import { Module } from '@nestjs/common';
import { ParkingsService } from './parking.service';
import { ParkinsgController } from './parking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Parking, ParkingSchema } from '../../schemas/parking/parking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Parking.name, schema: ParkingSchema }]),
  ],
  controllers: [ParkinsgController],
  providers: [ParkingsService],
})
export class ParkingModule {}
