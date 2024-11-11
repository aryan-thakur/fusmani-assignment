import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateIssueDto, UpdateIssueDto } from './dto';
import { IssueService } from './issue.service';

// endpoints are .../issue/[endpoint]
@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  @Post()
  postIssue(@Body() dto: CreateIssueDto) {
    return this.issueService.createIssue(dto);
  }

  @Get()
  getIssue(@Body() id) {
    return this.issueService.getIssue(id.id);
  }

  @Get('getAll')
  getAllIssues() {
    return this.issueService.getAllIssues();
  }

  @Delete()
  deleteIssue(@Body() id) {
    return this.issueService.deleteIssue(id.id);
  }

  @Patch()
  patchIssue(@Body() dto: UpdateIssueDto) {
    return this.issueService.editIssue(dto);
  }
}
