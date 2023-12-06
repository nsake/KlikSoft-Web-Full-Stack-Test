import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { LiveDataService } from './live-data.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LiveDataGateway {
  constructor(private readonly liveDataService: LiveDataService) {}

  @SubscribeMessage('/get-last-live-data')
  async getLiveData() {
    return this.liveDataService.getActualState();
  }
}
