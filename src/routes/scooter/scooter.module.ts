import { Module } from '@nestjs/common';
import { ScootersService } from './scooter.service';
import { ScootersController } from './scooter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Scooter, ScooterSchema } from 'src/schemas/scooter/scooter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Scooter.name, schema: ScooterSchema }]),
  ],
  controllers: [ScootersController],
  providers: [ScootersService],
})
export class ScooterModule {}
