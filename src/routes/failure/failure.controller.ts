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
import { FailuresService } from './failure.service';
import { CreateFailureDto } from './dto/create-failure.dto';
import { UpdateFailureDto } from './dto/update-failure.dto';
import { ParseObjectIdPipe } from 'src/pipes/ParseObjectIdPipe/ParseObjectIdPipe.pipe';
import { FailureStatus } from './enums/failure.enums';

@Controller('failures')
export class FailuresController {
  constructor(private readonly failureService: FailuresService) {}

  @Post()
  create(@Body() createFailureDto: CreateFailureDto) {
    return this.failureService.create(createFailureDto);
  }

  @Get('/status')
  findByStatus(@Query('status') status: FailureStatus) {
    return this.failureService.findByStatus(status);
  }

  @Get('/history')
  findFailureHistory() {
    return this.failureService.findFailureHistory();
  }

  @Get()
  findAll() {
    return this.failureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: any) {
    return this.failureService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: any,
    @Body() updateFailureDto: UpdateFailureDto,
  ) {
    return this.failureService.update(id, updateFailureDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: any) {
    return this.failureService.remove(id);
  }
}
