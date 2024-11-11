import { Module } from '@nestjs/common';
import { IssueModule } from './issue/issue.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({}), IssueModule],
})
export class AppModule {}
