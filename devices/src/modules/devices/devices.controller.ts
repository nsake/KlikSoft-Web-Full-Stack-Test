import { Body, Controller, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { SetDeviceSettingsDto } from './devices.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('set-settings')
  updateDevices(@Body() payload: SetDeviceSettingsDto) {
    return this.devicesService.setDeviceSettings(payload);
  }
}
