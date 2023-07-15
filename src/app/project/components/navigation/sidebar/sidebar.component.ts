import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { JProject } from '@trungk18/interface/project';
import { SideBarLink } from '@trungk18/interface/ui-model/nav-link';
import { SideBarLinks } from '@trungk18/project/config/sidebar';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import {CrudServicesService} from '../../../../services/crud-services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@UntilDestroy()
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;

  get sidebarWidth(): number {
    return this.expanded ? 240 : 15;
  }

  project: JProject;
  sideBarLinks: SideBarLink[];

  constructor(private _projectQuery: ProjectQuery,private crudService:CrudServicesService) {
    this.crudService.getProject().subscribe((res:any)=>{
      // console.log(res)
      this.project= res[0];
    })
  }

  ngOnInit(): void {
    this.sideBarLinks = SideBarLinks;
  }
}
