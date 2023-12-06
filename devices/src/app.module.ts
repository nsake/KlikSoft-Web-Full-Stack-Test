import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { DevicesModule } from './modules/devices/devices.module';
import { ScheduleModule } from '@nestjs/schedule';

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

    ScheduleModule.forRoot(),
    DevicesModule,
  ],
})
export class AppModule {}
