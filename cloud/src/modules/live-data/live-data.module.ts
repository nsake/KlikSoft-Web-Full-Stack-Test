import { Module } from '@nestjs/common';
import { LiveDataService } from './live-data.service';
import { SocketModule } from '../sockets/socket.module';
import { LiveDataController } from './live-data.controller';

@Module({
  imports: [SocketModule],
  controllers: [LiveDataController],
  providers: [LiveDataService],
  exports: [LiveDataService],
})
export class LiveDataModule {}
