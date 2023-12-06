import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { SocketModule } from './modules/sockets/socket.module';
import { LiveDataModule } from './modules/live-data/live-data.module';

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

    LiveDataModule,
  ],
})
export class AppModule {}
