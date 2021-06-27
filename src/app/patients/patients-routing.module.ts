import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsDetailComponent } from './components/patients-detail/patients-detail.component';
import { PatientsListComponent } from './components/patients-list/patients-list.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'patients', pathMatch: 'full',
  },
  {
    path: 'patients', component: PatientsListComponent,
  },
  {
    path: 'patients/create', component: PatientsDetailComponent,
  },
  {
    path: 'patients/:uid', component: PatientsDetailComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
