import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class SetDeviceSettingsDto {
  @IsNotEmpty()
  @IsNumber()
  devicesQuantity: number;

  @IsNotEmpty()
  @IsNumberString()
  frequency: string;
}
