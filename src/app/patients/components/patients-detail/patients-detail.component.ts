import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../models/patient.interface';
import { PatientsService } from '../../services/patients.service';

@Component({
  selector: 'app-patients-detail',
  templateUrl: './patients-detail.component.html',
  styleUrls: ['./patients-detail.component.scss']
})
export class PatientsDetailComponent implements OnInit {
  patientForm!: FormGroup;
  patientUidPath!: string | null;


  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.buildForm();
    this.patientUidPath = this.route.snapshot.paramMap.get('uid');
   }

  private buildForm(){
    this.patientForm = this.formBuilder.group({
      uid: [''],
      identidad: [''],
      nombre: [''],
      fechaNacimiento: [''],
      telefono: [''],
      domicilio: [''],
      centroVacunacion: [''],
      primeraDosis: [true],
      fechaPrimeraDosis: [''],
      segundaDosis: [false],
      fechaSegundaDosis: [''],
    })
  }



  ngOnInit(): void {
    this.getPatientInformation();
  }

  get PrimeraDosis(): string {
    const isActive = this.patientForm.get('primeraDosis')?.value as boolean;
    return isActive ? 'Si' : 'No';
  }

  get SegundaDosis(): string {
    const isActive = this.patientForm.get('segundaDosis')?.value as boolean;
    return isActive ? 'Si' : 'No';
  }

  inputBirthDate(birthDate: any) {
    this.patientForm.get('fechaNacimiento')?.setValue(birthDate.value._d)
  }

  inputPrimeraDosis(firstDosis: any) {
    this.patientForm.get('fechaPrimeraDosis')?.setValue(firstDosis.value._d)
  }

  inputSegundaDosis(secondDosis: any) {
    this.patientForm.get('fechaSegundaDosis')?.setValue(secondDosis.value._d)
  }

  getPatientInformation() {
    if (this.patientUidPath !== null) {
      this.patientService.getPatientByUid(this.patientUidPath).subscribe(
        (patient) => {
          this.setInfoToForm(patient);
        }
      )
    }
  }

  setInfoToForm(patient: Patient) {
    this.patientForm.get('uid')?.setValue(patient.uid);
    this.patientForm.get('identidad')?.setValue(patient.identidad);
    this.patientForm.get('nombre')?.setValue(patient.nombre);
    this.patientForm.get('fechaNacimiento')?.setValue(patient.fechaNacimiento.toDate());
    this.patientForm.get('telefono')?.setValue(patient.telefono);
    this.patientForm.get('domicilio')?.setValue(patient.domicilio);
    this.patientForm.get('centroVacunacion')?.setValue(patient.centroVacunacion);
    this.patientForm.get('primeraDosis')?.setValue(patient.primeraDosis);
    this.patientForm.get('fechaPrimeraDosis')?.setValue(patient.fechaPrimeraDosis.toDate());
    this.patientForm.get('segundaDosis')?.setValue(patient.segundaDosis);
    this.patientForm.get('fechaSegundaDosis')?.setValue(patient.fechaSegundaDosis.toDate());

  }

  save() {
    const patientData = this.patientForm.value as Patient;
    if (this.patientUidPath !== null) {
      // EDITANDO
      this.patientService.updatePatient(patientData).then(() => {
        console.log('Patient updated!');
      }).catch((err) => console.error(err));
    } else {
      // CREANDO
      this.patientService.createPatient(patientData).then(() => {
        console.log('Patient created!');
        this.router.navigate(['/patients']);
      }).catch((err) => console.error(err))
    }
  }

  deletePatient() {
    this.patientService.deletePatient(this.patientUidPath as string).then(() => this.router.navigate(['/patients']));
  }

}
