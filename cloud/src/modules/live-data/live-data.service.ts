import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getArrayWithLimitedLength } from 'src/infrastructure/utils/get-limited-array';
import { SocketEmitService } from '../sockets/socket.emit.service';

interface IDataset {
  label: string;
  data: number[];
}
@Injectable()
export class LiveDataService {
  constructor(private socketEmitService: SocketEmitService) {}

  // Each array max 10 elements length
  private state = {
    labels: getArrayWithLimitedLength(10),
    dataset: {} as IDataset,
    // i would like to use new Map instead of object,
    // but it can not be converted via JSON, so i decided to use plain object
  };

  //? For example
  //? Frequency was set to every 2s
  //? We push to state data every 2s, but when it reaches 10 elements,
  //? we dropping "oldest" one data.

  public updateState(devicesData: Array<{ id: string; name: string; data: number }>) {
    try {
      this.state.labels.push(new Date());

      devicesData.map((deviceData) => {
        const { id, name: label, data } = deviceData;

        const deviceState = this.state.dataset[id];

        // Update state if such device exists
        if (deviceState) {
          deviceState.data.push(data);

          this.state.dataset[id] = deviceState;

          return;
        }

        // Create new one record if there is no such device
        {
          const maxTenElementNewArray = getArrayWithLimitedLength<number>(10, data);

          this.state.dataset[id] = {
            label,
            data: maxTenElementNewArray,
          };
        }
      });

      this.socketEmitService.sendToRoom('graph-update', 'update', this.state);
    } catch (err) {
      console.log(err);

      return new InternalServerErrorException(
        'Received unexpectable error on updating state error',
      );
    }
  }
}
