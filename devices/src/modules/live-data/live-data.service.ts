import { Injectable } from '@nestjs/common';
import { getArrayWithLimitedLength } from 'src/infrastructure/utils/get-limited-array';
import { SocketEmitService } from '../sockets/socket.emit.service';

@Injectable()
export class LiveDataService {
  constructor(private socketEmitService: SocketEmitService) {}

  // Each array max 10 elements length
  private state = {
    labels: getArrayWithLimitedLength(10),
    dataset: new Map<string, { label: string; data: Array<number> }>(),
  };

  //? For example
  //? Frequency was set to every 2s
  //? We push to state data every 2s, but when it reaches 10 elements,
  //? we dropping "oldest" one data.

  public updateState(devicesData: Array<{ id: string; name: string; data: number }>) {
    const receivedStateTime = new Date();

    this.state.labels.push(receivedStateTime);

    devicesData.map((deviceData) => {
      const { id, name: label, data } = deviceData;

      // Update state if such device exists
      if (this.state.dataset.has(id)) {
        const currentDeviceDataState = this.state.dataset.get(id);

        currentDeviceDataState.data.push(data);

        this.state.dataset.set(id, currentDeviceDataState);

        return;
      }

      // Create new one record if there is no such device
      {
        const maxTenElementNewArray = getArrayWithLimitedLength<number>(10, data);

        this.state.dataset.set(id, {
          label,
          data: maxTenElementNewArray,
        });
      }

      this.socketEmitService.sendToRoom('graph-update', 'update', this.state);
    });
  }
}
