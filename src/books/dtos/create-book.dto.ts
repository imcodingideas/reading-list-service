import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../../graphql';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumberString()
  @IsOptional()
  rating?: number;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
