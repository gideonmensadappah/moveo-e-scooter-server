import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { ParkingModule } from './routes/parking/parking.module';
import { ScooterModule } from './routes/scooter/scooter.module';
import { FailureModule } from './routes/failure/failure.module';
import { AuthModule } from './routes/auth/auth.module';
import getDBURI from './utils/getDBURI';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ParkingModule,
    ScooterModule,
    FailureModule,
    MongooseModule.forRoot(getDBURI()),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
