import { Address, Message, Score } from "./Extra_Clases";

//Clase Voluntier/Voluntario
// Hemos tenido que poner alguno atributos en público debido a ciertos inconvenientes (Lo mismo que con la clase Petitioner)
export class Voluntary {
  public doc_id: string;
  public uid: string;
  public name: string;
  public surname: string;
  private birthdate: Date;
  public sex: string;
  private phoneNumber: number;
  public address: Address;
  public qualities: string[];
  private profileImage: string;
  public biography: string;
  private scores: Score[];
  private averageScore: number;
  private idCard: string;

  /*Métodos setter para sobreEscribir los atributos del voluntario*/
  setDocID(doc_id: string) {
    this.doc_id = doc_id;
  }
  setUID(uid: string) {
    this.uid = uid;
  }
  setName(name: string) {
    this.name = name;
  }
  setSurname(surname: string) {
    this.surname = surname;
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
  setAddress(address: Address) {
    this.address = address;
  }
  setQualities(qualities: string[]) {
    this.qualities = qualities;
  }
  setPhoto(photo: string) {
    this.profileImage = photo;
  }
  setBiography(biography: string) {
    this.biography = biography;
  }
  setIdCard(idCard: string) {
    this.idCard = idCard;
  }

  /*Métodos get para obtener los atributos del voluntario*/
  getDocID() {
    return this.doc_id;
  }
  getUID() {
    return this.uid;
  }
  getName() {
    return this.name;
  }
  getSurname() {
    return this.surname;
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
  getQualities() {
    return this.qualities;
  }
  getPhoto() {
    return this.profileImage;
  }
  getBiography() {
    return this.biography;
  }
  getAddress(): Address {
    return this.address;
  }
  getAverageScore() {
    return this.averageScore;
  }
  getID() {
    return this.idCard;
  }
  getIdCard() {
    return this.idCard;
  }
}
