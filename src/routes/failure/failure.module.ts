import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FailuresService } from './failure.service';
import { FailuresController } from './failure.controller';
import { Failure, FailureSchema } from 'src/schemas/failure/failure.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Failure.name, schema: FailureSchema }]),
  ],
  controllers: [FailuresController],
  providers: [FailuresService],
})
export class FailureModule {}
