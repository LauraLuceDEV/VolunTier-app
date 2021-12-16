import { Tutor } from "../Clases/PetitionerTutor";
import { Address } from '../Clases/Extra_Clases';
import firebase from 'firebase/app';

//Interfaz que nos será útil a la ora de cargar nuestro side-menu, que será dinámico.
// ya que, las opciones pueden variar dependiendo del tipo de usuario que sea
export interface ItemMenu{
    icon: string;
    name: string;
    event: string;
}

//Interfaz que nos será útil a la hora de insertar los primeros datos de nuestros usuarios en la DB de Firebase
export interface User {
  uuid: string;
  userType: string;
  email: string;
}

// Interfaz que nos ayudará a extraer los 'json' de los estilos de los botones del
// menu de editar perfil. Dependiendo del tipo de usuario que sea, habrá unas opciones u otras
export interface ButtonEditProfileOptions{
  name : string;
  color : string;
  event : string;
}


// DEPRECATED
// Interfaz que nos ayudará a plasmar la puntuación y comentarios que recibirán nuestros usuarios
export interface Commentary{
  userProfileImageRoute: string;
  userName: string;
  userValoration: string;
  userOpinion: string
}

// Para algunas promesas de respuesta de Firebase (create/ update Task)
export interface ZoneAwarePromise {
  __zone_symbol__state: boolean
  __zone_symbol__value: string
}

// Para las excusas al no poder realizarse una tarea de forma correcta
export interface Regrets {
  doc_ID: string;
  taskDocId : string;
  text: string;
  uuidTransmitter: string;
  uuidReceiver: string;
}

// Para las las quejas no poder realizarse una tarea de forma correcta
export interface Complain {
  doc_ID: string;
  taskDocId : string;
  text: string;
  uuidComplainant: string;
  uuidAccused: string;
  reportable : boolean;
}

// Para los mensajes del chat
export interface Message {
  createdAt: firebase.firestore.Timestamp;
  id: string;
  from: string;
  emitterName: string;
  content: string;
  to: string;
  myMsg: boolean;
}

export interface Conversation {
  docID: string;
  uuid: string;
  usersUidlist: string[];
}

/*Interfaz que aplicará el patrón builder para la creación de un objeto más complejo de tipo Voluntario/Voluntary*/
export interface IVoluntary_Builder{
  setPersonalData(name: string, surname: string, birthdate: Date, sex: string): void;
  setInformationData1(phoneNumber: number, ID: string): void;
  setAdressData(adress: string, country: string, city: string, pc: number): void;
  setQualities(qualities: string[]): void
  setInformationData2(photo: string, biography: string): void;
}

/*Interfaz que aplicará el patrón builder para la creación de un objeto más complejo de tipo Solicitante/Petitioner*/
export interface IPetitioner_Builder{
  setPersonalData(name: string, surname: string, birthdate: Date, sex: string): void;
  setInformationData1(phoneNumber: number, ID: string, tutor: Tutor): void;
  setAdressData(adress: Address): void;
  setIssues(problems: string[]): void;
  setInformationData2(photo: string, biography: string): void;
}
