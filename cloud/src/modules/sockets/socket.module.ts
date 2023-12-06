import { Module } from '@nestjs/common';
import { SocketStateService } from './socket.service';
import { SocketsGateway } from './sockets.gateway';
import { SocketEmitService } from './socket.emit.service';

@Module({
  providers: [SocketStateService, SocketEmitService, SocketsGateway],
  exports: [SocketStateService, SocketEmitService],
})
export class SocketModule {}
