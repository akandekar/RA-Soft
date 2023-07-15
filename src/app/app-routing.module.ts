import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VlogPageComponent} from './vlog-page/vlog-page.component';
import {SupportComponent} from './support/support.component';
import { MediaComponent } from './media/media.component';
import { GtCodeComponent } from './gt-code/gt-code.component';


const routes: Routes = [
  {
    path:'myBlogPage',
    component:VlogPageComponent
  },
  {
    path:'support',
    component:SupportComponent
  },
  {
    path:'media',
    component:MediaComponent
  },
  {
    path:'code',
    component:GtCodeComponent
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule)
  },
  {
    path: 'wip',
    loadChildren: () =>
      import('./work-in-progress/work-in-progress.module').then(
        (m) => m.WorkInProgressModule
      )
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
