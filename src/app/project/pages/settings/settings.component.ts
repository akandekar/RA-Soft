import { Component, OnInit } from '@angular/core';
import { ProjectConst } from '@trungk18/project/config/const';
import { JProject, ProjectCategory } from '@trungk18/interface/project';
import { ProjectQuery } from '@trungk18/project/state/project/project.query';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProjectService } from '@trungk18/project/state/project/project.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NoWhitespaceValidator } from '@trungk18/core/validators/no-whitespace.validator';
import {CrudServicesService} from '../../../services/crud-services.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
@UntilDestroy()
export class SettingsComponent implements OnInit {
  project: JProject;
  projectForm: FormGroup;
  categories: ProjectCategory[];
  get breadcrumbs(): string[] {
    return [ProjectConst.Projects, this.project?.name, 'Settings'];
  }

  constructor(
    private _projectQuery: ProjectQuery,
    private _projectService: ProjectService,
    private _notification: NzNotificationService,
    private _fb: FormBuilder,
    private _router: Router,
    private crudService:CrudServicesService
  ) {
    this.categories = [
      ProjectCategory.BUSINESS,
      ProjectCategory.MARKETING,
      ProjectCategory.SOFTWARE
    ];
  }

  ngOnInit(): void {
    this.initForm();
    this.crudService.getProject().subscribe((res:any)=>{
      this.project= res[0];
      this.updateForm(this.project);
    })
    
  }

  initForm() {
    this.projectForm = this._fb.group({
      name: ['', NoWhitespaceValidator()],
      url: [''],
      description: [''],
      category: [ProjectCategory.SOFTWARE]
    });
  }

  updateForm(project: JProject) {
    this.projectForm.patchValue({
      name: project.name,
      url: project.url,
      description: project.description,
      category: project.category
    });

  }
  
  submitForm() {
    const formValue: Partial<JProject> = this.projectForm.getRawValue();
    this._projectService.updateProject(formValue);
    let obj = {
      "id": this.project.id,
      "name": this.projectForm.controls['name'].value,
      "url": this.projectForm.controls['url'].value,
      "description": this.projectForm.controls['description'].value,
      "category": this.projectForm.controls['category'].value
    }
    this.crudService.putProject(obj).subscribe((res:any)=>{
      // console.log("res in update project form ",res)
      if(res)
      {
        this._notification.create(
          'success',
          'Changes have been saved successfully.',
          ''
        );
      }
    });
  }

  cancel() {
    this._router.navigate(['/']);
  }
}
