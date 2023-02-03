import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { ScootersService } from './scooter.service';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { ParseObjectIdPipe } from 'src/pipes/ParseObjectIdPipe/ParseObjectIdPipe.pipe';
import { Status } from './enums/scooter.enum';

@Controller('scooters')
export class ScootersController {
  constructor(private readonly scootersService: ScootersService) {}

  @Post()
  create(@Body() createScooterDto: CreateScooterDto) {
    return this.scootersService.create(createScooterDto);
  }

  @Get('/status')
  findByStatus(@Query('status') status: Status) {
    return this.scootersService.findByStatus(status);
  }

  @Get()
  findAll() {
    return this.scootersService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id', ParseObjectIdPipe) _id: any) {
    return this.scootersService.findOne(_id);
  }

  @Patch(':_id')
  update(
    @Param('_id', ParseObjectIdPipe) _id: any,
    @Body() updateScooterDto: UpdateScooterDto,
  ) {
    return this.scootersService.update(_id, updateScooterDto);
  }

  @Delete(':_id')
  remove(@Param('_id', ParseObjectIdPipe) _id: any) {
    return this.scootersService.remove(_id);
  }
}
