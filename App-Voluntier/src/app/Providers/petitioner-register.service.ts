import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Petitioner_Builder } from '../Models/Clases/BuilderClasses/Petitioner_Builder';
import { Tutor } from '../Models/Clases/PetitionerTutor';
import { DatabaseService } from './database.service';
import { Address } from '../Models/Clases/Extra_Clases';


// Servicio que nos ayudará a realizar la creación del usuario Solicitenate/Petitioner
// a través de las clases builder
// Y su correspondiente subida a la Base de Datos si todo está correcto
@Injectable({
  providedIn: 'root',
})
export class PetitionerRegisterService {
  private petitioner_Builder: Petitioner_Builder;
  private tutor: Tutor;

  //Constructor
  constructor(
    private dbServ: DatabaseService,
    private angularFirestore: AngularFirestore
  ) {}

  // Nos crea nuestra instancia del solicitante
  createPetitionerInstance() {
    this.petitioner_Builder = new Petitioner_Builder();
  }
  //Métodos que nos ayudarán con la creación de la instancia de un solicitante e insertarla en la DB

  //Nos devuelve la instancia del solicitante
  getPetitioner() {
    return this.petitioner_Builder.getPetitioner();
  }

  // A este método le pasamos por parámetro una variable 'booleana' que nos dirá si el solicitante tiene o no tutor
  // Esto nos será útil a la hora de hacer consultas, y a la hora de personalizar el menu de opciones del solicitante
  insertIfPetitionerHasTutor(hasTutor: boolean): void {
    this.petitioner_Builder.setHasTutor(hasTutor);
  }

  // Con este método insertaremos los datos personales del solicitante
  insertPetitionerPersonalData(name: string, surname: string, birthdate: Date, sex: string): void {
    this.petitioner_Builder.setPersonalData(name, surname, birthdate, sex);
  }

  // Nos inserta los datos del número de teléfono movil e ID del solicitante
  insertPetitionerInformationData1(phoneNumber: number, ID: string): void {
    this.petitioner_Builder.setInformationData1(phoneNumber, ID);
  }

  // Nos inserta la imagen y la biografia del solicitante
  insertPetitionerInformationData2(imgProfileName: string, biography: string) {
    this.petitioner_Builder.setInformationData2(imgProfileName, biography);
  }

  // Nos inserta los datos de la dirección del solicitante
  insertAddressData(completeAddress: string, countrySelected: string, city: string, pc: string) {
    let address = new Address();
    address.street = completeAddress;
    address.city = city;
    address.postalCode = pc.toString();
    address.country = countrySelected;
    this.petitioner_Builder.setAdressData(address);
  }

  // Nos inserta el array de problemas que puede tener el solicitante
  insertPetitionerIssues(issues: string[]): void {
    this.petitioner_Builder.setIssues(issues);
  }

  // Insercción en la DB
  // Nos crea al tutor en nuestra DB en FB
  public assingTutor(tutor: Tutor) {
    this.tutor = tutor;
  }

  // Nos crea al tutor en nuestra DB en FB
  public async createTutorOnFB(): Promise<boolean> {
    let success: boolean;

    this.angularFirestore.collection('Tutor').add(Object.assign({}, this.tutor))
    .then( (docRef) => {
      console.log('Document written with ID: ', docRef);
        success = true;
    })
    .catch( (error) => {
      console.error('Error adding document: ', error);
      success = false;
    });
    return success;
  }

  //Nos crea a nuestro Solicitante/Petitioner en la Base de Datos
  public async createPetitioner(): Promise<boolean> {
    let petitioner = this.getPetitioner();
    let success: boolean;

    const userUID = await this.dbServ.getUserUID();
    petitioner.setUID(userUID);

    // Transformar objeto JS a JSON
    petitioner.setAddress(Object.assign ({}, petitioner.getAddress()));
    const petitionerObj = Object.assign ({}, petitioner);

    this.angularFirestore
      .collection('Petitioner').add(petitionerObj)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef);
        success = true;
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
        success = false;
      });
    return success;

    // const doc = await this.angularFirestore
    //   .collection('Petitioner')
    //   .add(Object.assign({}, petitioner));
    // return true;
  }
}
