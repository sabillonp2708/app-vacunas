import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Patient } from '../../models/patient.interface';
import { PatientsService } from '../../services/patients.service';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {
  displayedColumns: string[] = ['identidad', 'nombre', 'fechaNacimiento', 'telefono', 'domicilio', 'centroVacunacion', 
  'primeraDosis', 'fechaPrimeraDosis', 'segundaDosis', 'fechaSegundaDosis','actions'];
  currentDate = new Date();
  dataSource = new MatTableDataSource<Patient>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private patientService: PatientsService,
  ) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getAllPatients().subscribe(patients => {
      if (patients && patients.length > 0) {
        this.dataSource = new MatTableDataSource<Patient>(patients);
      }else {
        this.dataSource = new MatTableDataSource<Patient>([]);
      }
    });
  }

  deletePatient(uid: string) {
    this.patientService.deletePatient(uid);
  }

}
