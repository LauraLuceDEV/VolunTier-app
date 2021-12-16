
import { IPetitioner_Builder } from "../../Interfaces/AllInterfaces";
import { Petitioner } from "../Petitioner";
import { Address } from '../Extra_Clases';

/*Clase Builder que nos ayudará a crear a nuestros solicitantes.
Se va hacer uso de esta clase ya que son instancias con bastantes datos*/
export class Petitioner_Builder implements IPetitioner_Builder{
    private petitioner: Petitioner;

    constructor(){
        this.reset();
    }

    public reset(): void {
        this.petitioner = new Petitioner();
    }

    // Para obtener al voluntario creado
    public getPetitioner(): Petitioner{
        return this.petitioner;
    }

    // Para darle valor al User ID del Solicitante/Petitioner
    setUserID(uid: string): void{
      this.petitioner.setUID(uid);
  }

    // Para saber si tiene o no tutor
    setHasTutor(hastutor: boolean): void{
        this.petitioner.setHasTutor(hastutor);
    }

    setPersonalData(name: string, surname: string, birthdate: Date, sex: string): void {
        this.petitioner.setName(name);
        this.petitioner.setSurname(surname);
        this.petitioner.setBirthdate(birthdate);
        this.petitioner.setSex(sex);
    }

    setInformationData1(phoneNumber: number, idNum: string): void {
        this.petitioner.setPhoneNumber(phoneNumber);
        this.petitioner.setID_Number(idNum);
    }

    setAdressData(adress: Address): void {
        this.petitioner.setAddress(adress);
    }

    setIssues(problems: string[]): void {
        this.petitioner.setIssues(problems);
    }
    setInformationData2(photo: string, biography: string): void {
        this.petitioner.setPhoto(photo);
        this.petitioner.setBiography(biography);
    }
}
