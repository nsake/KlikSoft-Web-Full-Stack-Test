import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketStateService } from './socket.service';
import { SocketEmitService } from './socket.emit.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(
    private socketStateService: SocketStateService,
    private socketEmitService: SocketEmitService,
  ) {}

  afterInit(server: Server) {
    this.socketEmitService.server = server;
  }

  handleConnection(socket: Socket) {
    this.socketStateService.add(socket.id, socket);
    this.connectToRoom(socket);
  }

  handleDisconnect(socket: Socket) {
    this.socketStateService.remove(socket.id);
    this.disconnectFromRoom(socket);
  }

  connectToRoom(socket: Socket) {
    socket.join('graph-update');
  }

  disconnectFromRoom(socket: Socket) {
    socket.leave('graph-update');
  }
}
