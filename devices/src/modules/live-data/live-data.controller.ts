import { Body, Controller, Post } from '@nestjs/common';
import { LiveDataService } from './live-data.service';
import { LiveDataDto } from './live-data.dto';

@Controller('live-data')
export class LiveDataController {
  constructor(private readonly liveDataService: LiveDataService) {}

  @Post()
  updateLiveData(@Body() payload: LiveDataDto) {
    return this.liveDataService.updateState(payload.devicesData);
  }
}
