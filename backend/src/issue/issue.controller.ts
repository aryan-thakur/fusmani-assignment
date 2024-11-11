import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CreateIssueDto, UpdateIssueDto } from './dto';
import { IssueService } from './issue.service';

// endpoints are .../auth/[endpoint]
@Controller('issue')
export class IssueController {
  constructor(private issueService: IssueService) {}

  // Techincally, as a parameter you could write @Req req: Request and work with an Express-style request
  // Can also use @Body('email') email: string as a parameter if you want to extract fields named 'email' and so on csv
  // @UsePipes(new ValidationPipe()) if I wanted to do piping only locally
  @Post()
  postIssue(@Body() dto: CreateIssueDto) {
    return this.issueService.createIssue(dto);
  }

  @Get()
  getIssue(@Body() id: string) {
    return this.issueService.getIssue(id);
  }

  @Get('getAll')
  getAllIssues() {
    return this.issueService.getAllIssues();
  }

  @Delete()
  deleteIssue(@Body() id: string) {
    return this.issueService.deleteIssue(id);
  }

  @Patch()
  patchIssue(@Body() dto: UpdateIssueDto) {
    return this.issueService.editIssue(dto);
  }
}
