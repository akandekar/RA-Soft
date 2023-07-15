import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { IssueStatus } from '@trungk18/interface/issue';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { AuthQuery } from '@trungk18/project/auth/auth.query';
import {CrudServicesService} from '../../../../services/crud-services.service';
@UntilDestroy()
@Component({
  selector: 'board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss']
})
export class BoardDndComponent implements OnInit {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];

  Issues:any=[];
  Backlog:any={
    'Backlog':[],
    'InProgress':[],
    'Done':[],
    'Selected':[],
  }

  constructor(public projectQuery: ProjectQuery, public authQuery: AuthQuery,private crudServices:CrudServicesService) {
    
  }
  ngOnInit(): void {
  }

  
}
