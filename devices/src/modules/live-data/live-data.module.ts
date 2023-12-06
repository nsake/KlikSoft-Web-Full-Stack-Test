import { Module } from '@nestjs/common';
import { LiveDataService } from './live-data.service';
import { SocketModule } from '../sockets/socket.module';

@Module({
  imports: [SocketModule],
  providers: [LiveDataService],
  exports: [LiveDataService],
})
export class LiveDataModule {}
