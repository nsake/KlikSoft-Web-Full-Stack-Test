import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { SocketModule } from './modules/helpers/sockets/socket.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 30,
        },
      ],
    }),

    SocketModule,
  ],
})
export class AppModule {}
