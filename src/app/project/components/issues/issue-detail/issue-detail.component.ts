import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { JIssue } from '@trungk18/interface/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IssueDeleteModalComponent } from '../issue-delete-modal/issue-delete-modal.component';
import { DeleteIssueModel } from '@trungk18/interface/ui-model/delete-issue-model';

@Component({
  selector: 'issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit{
  @Input() issue: JIssue;
  @Input() isShowFullScreenButton: boolean;
  @Input() isShowCloseButton: boolean;
  @Input() userList:any;
  @Output() onClosed = new EventEmitter();
  @Output() onOpenIssue = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<DeleteIssueModel>();
  enableForUse:boolean=false;

  constructor(public projectQuery: ProjectQuery, private _modalService: NzModalService) {
  }
  
  ngOnInit(): void {
  }
  
  ngOnChanges(changes:any)
  {
    if(this.issue)
    {
      let id = this.issue.reporterId;
      let id2 = JSON.parse(localStorage.getItem('sessionValue'));
      if(id.includes(id2.value))
      {
        this.enableForUse = true;
      }
      else
      {
        this.enableForUse = false;
      }
    }
  }

  openDeleteIssueModal() {
    this._modalService.create({
      nzContent: IssueDeleteModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzStyle: {
        top: '140px'
      },
      nzComponentParams: {
        issueId: this.issue.id,
        onDelete: this.onDelete
      }
    });
  }

  closeModal() {
    this.onClosed.emit();
  }

  openIssuePage() {
    this.onOpenIssue.emit(this.issue.id);
  }
}
