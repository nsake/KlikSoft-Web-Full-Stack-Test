import { Module } from '@nestjs/common';
import { LiveDataService } from './live-data.service';
import { SocketModule } from '../sockets/socket.module';
import { LiveDataController } from './live-data.controller';
import { LiveDataGateway } from './live-data.gateway';

@Module({
  imports: [SocketModule],
  controllers: [LiveDataController],
  providers: [LiveDataService, LiveDataGateway],
  exports: [LiveDataService],
})
export class LiveDataModule {}
