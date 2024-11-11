import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(['Low', 'Medium', 'High'])
  priority: 'Low' | 'Medium' | 'High';
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

  @IsEnum(['Open', 'In Progress', 'Resolved'])
  @IsOptional()
  status?: 'Open' | 'In Progress' | 'Resolved';

  @IsEnum(['Low', 'Medium', 'High'])
  @IsOptional()
  priority?: 'Low' | 'Medium' | 'High';
}
