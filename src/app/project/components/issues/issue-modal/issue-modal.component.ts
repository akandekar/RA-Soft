import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JIssue } from '@trungk18/interface/issue';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { DeleteIssueModel } from '@trungk18/interface/ui-model/delete-issue-model';
import {CrudServicesService} from '../../../../services/crud-services.service';

@Component({
  selector: 'issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.scss']
})
export class IssueModalComponent {
  @Input() issue$: any;
  userList:any=[];

  constructor(
    private _modal: NzModalRef,
    private _router: Router,
    private _projectService: ProjectService,
    private crudServices:CrudServicesService
  ) {
    this.crudServices.getUsers().subscribe((res:any)=>{
      if(res)
      {
        this.userList = res;
      }
    })
  }

  closeModal() {
    this._modal.close();
  }

  openIssuePage(issueId: string) {
    this.closeModal();
    this._router.navigate(['project', 'issue', issueId]);
  }

  deleteIssue({ issueId, deleteModalRef }: DeleteIssueModel) {
    this._projectService.deleteIssue(issueId);
    deleteModalRef.close();
    this.closeModal();
  }
}
