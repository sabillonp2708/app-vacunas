import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [

  {
    path: '', component: SidebarComponent, loadChildren: () => import('./patients/patients.module').then((m) => m.PatientsModule),
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
