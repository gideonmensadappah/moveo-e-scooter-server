import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParkingsService } from './parking.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { ParseObjectIdPipe } from 'src/pipes/ParseObjectIdPipe/ParseObjectIdPipe.pipe';

@Controller('api/parkings')
export class ParkinsgController {
  constructor(private readonly parkingsService: ParkingsService) {}

  @Post()
  create(@Body() createParkingDto: CreateParkingDto) {
    return this.parkingsService.create(createParkingDto);
  }

  @Get()
  findAll() {
    return this.parkingsService.findAll();
  }
  @Get('/availabilities')
  findAllParkingAvailabilities() {
    return this.parkingsService.findAllParkingAvailabilities();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: any) {
    return this.parkingsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: any,
    @Body() updateParkingDto: UpdateParkingDto,
  ) {
    return this.parkingsService.update(id, updateParkingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: any) {
    return this.parkingsService.remove(id);
  }
}
