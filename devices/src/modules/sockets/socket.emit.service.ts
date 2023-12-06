import { Injectable } from '@nestjs/common';

import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
export class SocketEmitService {
  @WebSocketServer()
  private server: Server;

  public sendToRoom(roomName: string, event: string, data: unknown): boolean {
    return this.server.to(roomName).emit(event, data);
  }
}
