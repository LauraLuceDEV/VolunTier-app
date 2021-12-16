import { Petitioner } from './Petitioner';

// Clase Tutor. Para poder así crear nuestras instancias de los tutores de los solicitantes.
// Sólo los que no sean dependientes tencnológicos.
// Solicitante y Tutor irán vinculados por el doc_id del usuario

export class Tutor {
  private user_doc_id: string;
  private name: string;
  private surname: string;
  private birthdate: Date;
  private sex: string;
  private phoneNumber: number;
  private ID_Number: string;

  //Constructor. Aquí si obviaremos el patrón builder ya que no es un objeto complejo
  constructor(name: string, surname: string, birthdate: Date, sex: string,
    phoneNumber: number, ID_Number?: string, user_doc_id?: string) {
    this.user_doc_id = user_doc_id;
    this.name = name;
    this.surname = surname;
    this.birthdate = birthdate;
    this.sex = sex;
    this.phoneNumber = phoneNumber;
    this.ID_Number = ID_Number;
  }

  setUserDoc_ID(userDoc_ID: string) {
    this.user_doc_id = userDoc_ID;
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
  setID_Card(ID: string) {
    this.ID_Number = ID;
  }

  getUserDoc_ID() {
    return this.user_doc_id;
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
  getID_Card() {
    return this.ID_Number;
  }
}
