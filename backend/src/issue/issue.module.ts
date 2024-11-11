import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [IssueController],
  providers: [IssueService],
})
export class IssueModule {}
