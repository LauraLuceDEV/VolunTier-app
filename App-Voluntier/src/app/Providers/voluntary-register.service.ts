import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Voluntary_Builder } from '../Models/Clases/BuilderClasses/Voluntary_Builder';
import { DatabaseService } from './database.service';

// Servicio que nos ayudará a realizar la creación del usuario Voluntario/Voluntary
// a través de las clases builder
// Y su correspondiente subida a la Base de Datos si todo está correcto
@Injectable({
  providedIn: 'root',
})
export class VoluntaryRegisterService {
  private voluntary_Builder: Voluntary_Builder;

  //Constructor
  constructor(
    private dbServ: DatabaseService,
    private angularFirestore: AngularFirestore
  ) {}

  // Nos crea nuestra instancia del voluntario
  createVoluntaryInstance() {
    this.voluntary_Builder = new Voluntary_Builder();
  }

  //Nos devuelve a nuestro voluntario
  getVoluntary() {
    return this.voluntary_Builder.getVoluntary();
  }



  /*Nos llamará al primer método de la clase Voluntary_Builder, para así poder insertar los datos personales del Voluntario*/
  insertVoluntaryPersonaltData(name: string, surname: string, birthdate: Date, sex: string): void {
    console.log(name, surname, birthdate, sex);
    this.voluntary_Builder.setPersonalData(name, surname, birthdate, sex);
  }

  /*Nos llamará al segundo método de la clase Voluntary_Builder, para así poder insertar los datos cómo el DNI y documento identificativo (DNI/ID) del voluntario*/
  insertVoluntaryInformationData(phoneNumber: number, ID: string): void {
    this.voluntary_Builder.setInformationData1(phoneNumber, ID);
  }

  // Nos inserta la dirección del voluntario
  insertAddressData(completeAddress: string, country: string, city: string, pc: number) {
    this.voluntary_Builder.setAdressData(completeAddress, country, city, pc);
  }

  // Nos inserta el nombre de su foto de perfil, par aluego buscarla en nuestra DB enFB y la biografía
  insertPetitionerInformationData2(photoName: string, biography: string): void {
    this.voluntary_Builder.setInformationData2(photoName, biography);
  }

  /*Nos llamará al segundo método de la clase Voluntary_Builder, para así poder insertar los datos cómo el DNI y documento identificativo (DNI/ID) del voluntario*/
  insertVoluntaryqualities(qualities: string[]): void {
    this.voluntary_Builder.setQualities(qualities);
  }

  // Nos crea al voluntario en nuestra DB en FB
  public async createVoluntary(): Promise<boolean> {
    let voluntary = this.getVoluntary();
    let success: boolean;

    const userDocId = await this.dbServ.getUserUID();
    voluntary.setUID(userDocId);

    // Transformar de objeto JS a JSON
    voluntary.setAddress(Object.assign ({}, voluntary.getAddress()));
    const voluntaryObj = Object.assign ({}, voluntary);

    this.angularFirestore
      .collection('Voluntary').add(voluntaryObj)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef);
        success = true;
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        success = false;
      });
    return success;
  }
}
