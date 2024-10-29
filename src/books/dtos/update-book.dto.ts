import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Status } from '../../graphql';

export class UpdateBookDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

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
