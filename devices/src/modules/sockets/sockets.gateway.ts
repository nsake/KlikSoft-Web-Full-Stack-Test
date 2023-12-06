import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketStateService } from './socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private socketStateService: SocketStateService) {}

  handleConnection(socket: Socket) {
    this.socketStateService.add(socket.id, socket);

    this.connectToRoom(socket);
  }

  handleDisconnect(socket: Socket) {
    this.socketStateService.remove(socket.id);
  }

  connectToRoom(socket: Socket) {
    socket.join('graph-update');
  }

  disconnectFromRoom(socket: Socket) {
    socket.leave('graph-update');
  }
}
