export interface Patient {
    uid?: string;
    identidad: string;
    nombre: string;
    fechaNacimiento: firebase.default.firestore.Timestamp;
    telefono: string;
    domicilio: string;
    centroVacunacion: string;
    primeraDosis: boolean;
    fechaPrimeraDosis: firebase.default.firestore.Timestamp;
    segundaDosis: boolean;
    fechaSegundaDosis: firebase.default.firestore.Timestamp;
}