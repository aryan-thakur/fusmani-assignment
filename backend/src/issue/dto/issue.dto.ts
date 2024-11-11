import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Priority } from '../pri-enum';
import { Status } from '../stat-enum';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Priority, {
    message: 'priority must be one of the following values: Low, Medium, High',
  })
  priority: Priority;
}

export class UpdateIssueDto {
  @IsUUID()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Status, { message: 'Status must be: In Progress, Open or Resolved' })
  @IsOptional()
  status?: Status;

  @IsEnum(Priority, {
    message: 'priority must be one of the following values: Low, Medium, High',
  })
  @IsOptional()
  priority?: Priority;
}
