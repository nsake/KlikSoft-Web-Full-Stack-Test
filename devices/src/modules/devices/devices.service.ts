import nano from 'nanoid';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';

import { TDeviceSettings } from './devices.types';

@Injectable()
export class DevicesService {
  private deviceSettings = null || ({} as TDeviceSettings);

  private devices = [] as Array<{ id: string; name: string }>;

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  public setDeviceSettings(deviceSettings: TDeviceSettings) {
    this.deviceSettings = deviceSettings;

    this.generateDevices();

    this.createIntervalJob(
      'send-devices-data',
      deviceSettings.frequency,
      this.sendDevicesData.bind({ devices: this.devices }),
    );
  }

  private generateDevices() {
    const devicesQuantity = this.deviceSettings.devicesQuantity;

    if (devicesQuantity > this.devices.length) {
      const devicesToGenerate = devicesQuantity - this.devices.length;

      for (let i = 0; i < devicesToGenerate; i++) {
        const id = nano.nanoid(5);

        const name = `device-${id}`;

        this.devices.push({ id, name });
      }
    }
  }

  private sendDevicesData() {
    const devices = this.devices;

    const body = {
      devicesData: devices.map((device) => ({
        ...device,
        data: Math.round(Math.random() * 10),
      })),
    };

    console.log('body', body);

    const link = `http://localhost:3000/live-data`;

    const options = {
      method: 'post',
    };

    try {
      axios.post(link, body, options);
    } catch (err) {
      console.log('Error on request');
    }
  }

  public createIntervalJob(name: string, frequency: string, callback: () => void) {
    const isIntervalExists = this.schedulerRegistry.doesExist('interval', name);

    if (isIntervalExists) {
      const interval = this.schedulerRegistry.getInterval(name);

      clearInterval(interval);

      this.deleteInterval(name);
    }

    const ms = Number(frequency) * 1000;

    this.addInterval(name, ms, callback);
  }

  private addInterval(name: string, milliseconds: number, callback: () => void) {
    const interval = setInterval(callback, milliseconds);
    this.schedulerRegistry.addInterval(name, interval);

    console.log(`Interval ${name} was set!`);
  }

  private deleteInterval(name: string) {
    this.schedulerRegistry.deleteInterval(name);
    console.log(`Interval ${name} deleted!`);
  }
}
