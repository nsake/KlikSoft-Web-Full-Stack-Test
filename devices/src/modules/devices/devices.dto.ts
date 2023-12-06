import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SetDeviceSettingsDto {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  devicesQuantity: number;

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  frequency: number;
}
