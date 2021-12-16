import { Address, Message, Score } from "./Extra_Clases";

// Clase Petitioner/Solicitante.
// Hemos tenido que poner alguno atributos en público debido a ciertos inconvenientes (Lo mismo que con la clase Voluntary)
export class Petitioner {
  public doc_id: string;
  public uid: string;
  private hasTutor: boolean;
  public name: string;
  public surname: string;
  private ID_Number: string;
  private birthdate: Date;
  public sex: string;
  private phoneNumber: number;
  public address: Address;
  public issues: string[];
  private profileImage: string;
  public biography: string;

  /*Métodos setter para sobreEscribir los atributos del solicitante*/
  setDoc_ID(documentNumber: string) {
    this.doc_id = documentNumber;
  }

  setUID(uid: string) {
    this.uid = uid;
  }
  setHasTutor(hasTutor: boolean) {
    this.hasTutor = hasTutor;
  }
  setName(name: string) {
    this.name = name;
  }
  setSurname(surname: string) {
    this.surname = surname;
  }
  setID_Number(ID: string) {
    this.ID_Number = ID;
  }
  setSex(sex: string) {
    this.sex = sex;
  }
  setBirthdate(birthdate: Date) {
    this.birthdate = birthdate;
  }
  setPhoneNumber(phoneNumber: number) {
    this.phoneNumber = phoneNumber;
  }
  setIssues(issues: string[]) {
    this.issues = issues;
  }
  setPhoto(photo: string) {
    this.profileImage = photo;
  }
  setBiography(biography: string) {
    this.biography = biography;
  }
  setAddress(address: Address) {
    this.address = address;
  }

  /*Métodos get para obtener los atributos del solicitante*/
  getDoc_ID() {
    return this.doc_id;
  }
  getUID() {
    return this.uid;
  }
  getHasTutor() {
    return this.hasTutor;
  }
  getName() {
    return this.name;
  }
  getSurname() {
    return this.surname;
  }
  getID() {
    return this.ID_Number;
  }
  getID_Number() {
    return this.ID_Number;
  }
  getSex() {
    return this.sex;
  }
  getBirthdate() {
    return this.birthdate;
  }
  getPhoneNumber() {
    return this.phoneNumber;
  }
  getIssues() {
    return this.issues;
  }
  getPhoto() {
    return this.profileImage;
  }
  getBiography() {
    return this.biography;
  }
  getAddress() {
    return this.address;
  }

}
