import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateIssueDto, UpdateIssueDto } from './dto';
import { Issue } from './interface';

@Injectable({})
export class IssueService {
  constructor() {}

  private issueList = [];

  createIssue(dto: CreateIssueDto): Issue {
    const newIssue: Issue = {
      id: uuidv4(),
      title: dto.title,
      description: dto.description,
      status: 'Open',
      priority: dto.priority,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    this.issueList.push(newIssue);
    return newIssue;
  }

  deleteIssue(id: string) {
    const index = this.issueList.findIndex((issue) => issue.id === id);
    try {
      if (index === -1) {
        throw new NotFoundException('Issue not found');
      }

      this.issueList.splice(index, 1);
    } catch (error) {
      throw new NotFoundException('Issue not found');
    }
  }

  editIssue(dto: UpdateIssueDto) {
    const index = this.issueList.findIndex((issue) => issue.id === dto.id);

    if (index === -1) {
      throw new NotFoundException('Issue not found');
    }

    const issue = this.issueList[index];
    issue.title = dto.title ?? issue.title;
    issue.description = dto.description ?? issue.description;
    issue.status = dto.status ?? issue.status;
    issue.priority = dto.priority ?? issue.priority;
    issue.updatedDate = new Date();

    return issue;
  }

  getIssue(id: string) {
    const issue = this.issueList.find((issue) => issue.id === id);
    if (!issue) throw new NotFoundException('Issue not found');
    return issue;
  }

  getAllIssues(): Issue[] {
    return this.issueList;
  }
}
