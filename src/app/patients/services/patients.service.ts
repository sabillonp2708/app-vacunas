import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Patient } from '../models/patient.interface';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private afs: AngularFirestore,
  ) { }

  getAllPatients(){
    return this.afs.collection('vacunas').snapshotChanges().pipe(
      map((snapshot) => {
        return snapshot.map((action) => {
          const data = action.payload.doc.data() as Patient;
          data.uid = action.payload.doc.id;
          return data;
        });
      })
    )
  }

  getPatientByUid(uid: string) {
    return this.afs.collection('vacunas').doc(uid).valueChanges().pipe(map((patient: any) => patient as Patient));
  }

  createPatient(patient: Patient) {
    const docId = this.afs.createId();
    const timestampBirthDate = firebase.firestore.Timestamp.fromDate(patient.fechaNacimiento as any);
    const timestampFirstDosis = firebase.firestore.Timestamp.fromDate(patient.fechaPrimeraDosis as any);
    const timestampSecondDosis = firebase.firestore.Timestamp.fromDate(patient.fechaSegundaDosis as any);
    patient.uid = docId;
    return this.afs.collection('vacunas').doc(docId).set({
      uid: patient.uid,
      identidad: patient.identidad,
      nombre: patient.nombre,
      fechaNacimiento: timestampBirthDate,
      telefono: patient.telefono,
      domicilio: patient.domicilio,
      centroVacunacion: patient.centroVacunacion,
      primeraDosis: patient.primeraDosis,
      fechaPrimeraDosis: timestampFirstDosis,
      segundaDosis: patient.segundaDosis,
      fechaSegundaDosis: timestampSecondDosis,
    });
  }

  updatePatient(patient: Patient) {
    const patientDocRef = this.afs.collection('vacunas').doc(patient.uid);
    return patientDocRef.update(patient);
  }

  deletePatient(uid: string) {
    const patientDocRef = this.afs.collection('vacunas').doc(uid);
    return patientDocRef.delete();
  }
}
