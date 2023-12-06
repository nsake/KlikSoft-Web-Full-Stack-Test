import { Injectable } from '@nestjs/common';

import { Server } from 'socket.io';

@Injectable()
export class SocketEmitService {
  public server: Server = null;

  public sendToRoom(roomName: string, event: string, data: unknown): boolean {
    console.log('Send Request to Room', { roomName, event, data });
    console.log('Described data', (data as any).datasets);

    return this.server.to(roomName).emit(event, data);
  }
}
