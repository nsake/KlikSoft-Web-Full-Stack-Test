import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';

export class DevicesDataDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  data: number;
}

export class LiveDataDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => Array<DevicesDataDto>)
  devicesData: Array<DevicesDataDto>;
}
