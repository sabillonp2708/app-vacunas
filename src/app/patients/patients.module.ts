import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { PatientsDetailComponent } from './components/patients-detail/patients-detail.component';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PatientsListComponent,
    PatientsDetailComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,

    // Reactive forms
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule
  ]
})
export class PatientsModule { }
