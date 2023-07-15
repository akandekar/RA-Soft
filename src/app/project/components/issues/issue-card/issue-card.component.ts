import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JIssue } from '@trungk18/interface/issue';
import { IssuePriorityIcon } from '@trungk18/interface/issue-priority-icon';
import { JUser } from '@trungk18/interface/user';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { IssueUtil } from '@trungk18/project/utils/issue';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueModalComponent } from '../issue-modal/issue-modal.component';
import {CrudServicesService} from '../../../../services/crud-services.service';

@Component({
  selector: 'issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
@UntilDestroy()
export class IssueCardComponent implements OnChanges, OnInit {
  @Input() issue: JIssue;
  @Input() userLists:any;
  assignees: JUser[];
  issueTypeIcon: string;
  priorityIcon: IssuePriorityIcon;

  constructor(private _projectQuery: ProjectQuery, private _modalService: NzModalService,private crudServices:CrudServicesService) 
  {
  }

  ngOnInit(): void {
    this.setAssignUsers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setAssignUsers();
    if(changes.issue)
    {
      const issueChange = changes.issue;
      if (issueChange?.currentValue !== issueChange.previousValue) {
        this.issueTypeIcon = IssueUtil.getIssueTypeIcon(this.issue.type);
        this.priorityIcon = IssueUtil.getIssuePriorityIcon(this.issue.priority);
      }
    }
  }


  setAssignUsers()
  {
    let ids = this.issue.userIds;
    this.assignees = this.userLists.filter(obj => {
      if(ids.includes(obj.id))
      {
        return true;
      }
      else
      {
        return false;
      }
      
    });
  }

  openIssueModal(issueId: string) {
    this._modalService.create({
      nzContent: IssueModalComponent,
      nzWidth: 1040,
      nzClosable: false,
      nzFooter: null,
      nzComponentParams: {
        issue$: this.issue
      }
    });
  }
}
