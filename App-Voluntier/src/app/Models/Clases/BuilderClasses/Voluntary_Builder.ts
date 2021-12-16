import { IVoluntary_Builder } from "../../Interfaces/AllInterfaces";
import { Score, Address } from '../Extra_Clases';
import { Voluntary } from "../Voluntary";

/*Clase Builder que nos ayudará a crear a nuestros voluntarios.
Se va hacer uso de esta clase ya que son instancias con bastantes datos*/
export class Voluntary_Builder implements IVoluntary_Builder{
    private voluntary: Voluntary;

    constructor(){
        this.reset();
    }

    public reset(): void {
        this.voluntary = new Voluntary();
    }

    // Para obtener al voluntario creado
    public getVoluntary(): Voluntary{
        return this.voluntary;
    }


    /*Métodos implementados de la interfaz 'IVoluntary_Builder', nos ayudarán a crear mejores objetos complejos*/
    setPersonalData(name: string, surname: string, birthdate: Date, sex: string): void {
        this.voluntary.setName(name);
        this.voluntary.setSurname(surname);
        this.voluntary.setBirthdate(birthdate);
        this.voluntary.setSex(sex);
    }
    setInformationData1(phoneNumber: number, ID: string): void {
        this.voluntary.setPhoneNumber(phoneNumber);
        this.voluntary.setIdCard(ID);
    }

    setAdressData(completeAdress: string, country: string, city: string, pc: number): void {
        let address = new Address();
        address.street = completeAdress;
        address.city = city;
        address.postalCode = pc.toString();
        address.country = country;
        this.voluntary.setAddress(address);
    }

    setQualities(qualities: string[]): void {
        console.log(qualities)
        this.voluntary.setQualities(qualities);
    }

    setInformationData2( photoName: string, biography: string){
        this.voluntary.setPhoto(photoName);
        this.voluntary.setBiography(biography);
    }
}
