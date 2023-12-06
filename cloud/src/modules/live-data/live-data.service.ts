import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getArrayWithLimitedLength } from 'src/infrastructure/utils/get-limited-array';
import { SocketEmitService } from '../sockets/socket.emit.service';
import * as dayjs from 'dayjs';
interface IDataset {
  label: string;
  data: number[];
  color: string;
}
@Injectable()
export class LiveDataService {
  constructor(private socketEmitService: SocketEmitService) {}

  // Each array max 10 elements length
  private state = {
    labels: getArrayWithLimitedLength({ length: 10 }),
    datasets: {} as IDataset,
    // i would like to use new Map instead of object,
    // but it can not be converted via JSON, so i decided to use plain object
  };

  //? For example
  //? Frequency was set to every 2s
  //? We push to state data every 2s, but when it reaches 10 elements,
  //? we dropping "oldest" one data.

  public getActualState() {
    return {
      ...this.state,
      datasets: Object.values(this.state.datasets),
    };
  }

  public updateState(devicesData: Array<{ id: string; name: string; data: number }>) {
    try {
      this.state.labels.push(dayjs().format('HH:mm:ss'));

      devicesData.map((deviceData) => {
        const { id, name: label, data } = deviceData;

        const deviceState = this.state.datasets[id];

        // Update state if such device exists
        if (deviceState) {
          deviceState.data.push(data);

          this.state.datasets[id] = deviceState;

          return;
        }

        // Create new one record if there is no such device
        {
          const alreadyExistsLabels = this.state.labels.length;

          const maxTenElementNewArray = getArrayWithLimitedLength<number>({
            length: 10,
            firstElement: data,
            ...(alreadyExistsLabels > 1 && {
              fillArrayWith: { value: null, range: alreadyExistsLabels },
            }),
          });

          const random = () => Math.floor(Math.random() * 255);

          this.state.datasets[id] = {
            label,
            data: maxTenElementNewArray,
            color: `rgb(${random()}, ${random()}, ${random()})`,
          };
        }
      });

      this.socketEmitService.sendToRoom('graph-update', 'update', {
        ...this.state,
        datasets: Object.values(this.state.datasets),
      });
    } catch (err) {
      return new InternalServerErrorException(
        'Received unexpectable error on updating state error',
      );
    }
  }
}
