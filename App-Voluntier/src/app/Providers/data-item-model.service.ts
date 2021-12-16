import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ButtonEditProfileOptions, ItemMenu } from '../Models/Interfaces/AllInterfaces';
import { Observable, Subject } from 'rxjs';


// Este servicio nos ayudará a editar el contenido de algunas páginas y componentes, dependiendo del tipo de usuario
// y las acciones que esta vaya a tomar en el futuro
@Injectable({
  providedIn: 'root'
})
export class DataItemModelsService {
  //Datos de los formularios
  public styleInputDataForm:  string;
  public currentTaskDocID: string;
  public userSex: string;
  public userType$ = new Subject<string>();

  // Variable que nos indicará si el tipo de formulario
  // realizado para los comentario, es positivo o se trata de una queja
  public userType: string;


  // Variable que nos indicará como será el formulario de 'complain-regret-form'
  public complain_or_regret_mode: string;

  //Variables que nos recogerá las propiedades del usuario
  // Estas serán las cualidades que puede tener un voluntario como
  // los problemas que puede tener un solicitante
  // Guardará el nombre de las imágenes que ha seleccionado para mostrarlas luego en su perfil
  userProperties: string[];

   // Variable que nos ayudará a ocultar o no el menu de filtrar tareas del Voluntario
   showTaskFilterMenu$ = new EventEmitter<boolean>();

  //Constructor
  constructor(private http: HttpClient) {}


  //MÉTODOS


  //-----------------------------
  // SETTERS
  //-----------------------------

  //Nos cambiará el contenido de la variable para que cambie el estilo del formulario
  public setUserType(currentStyle: string){
    this.userType = currentStyle;
    this.userType$.next(currentStyle);
  }

  //Nos cambiará el contenido de la variable para que cambie el estilo del formulario de los perfiles de voluntario y solicitante
  public setStyleInputDataForm(currentMode: string){
    this.styleInputDataForm = currentMode;
  }

  //Nos cambiará el contenido de la variable para saber el tipo de sexo del usuario
  public setUserSex(sexType: string){
    this.userSex = sexType;
  }

  // Nos cmabia el DOC_ID de la tarea que queremos buscar
  public setCurrentTaskDocID(currentTaskDocID: string){
    this.currentTaskDocID = currentTaskDocID;
  }

  //Nos cambiará el contenido de la variable para saber el tipo de usuario
  public setUserProperties(properties: string[]){
    this.userProperties = properties;
  }

  //Nos cambiará el contenido de la variable para saber el tipo de comentario
  public setComplainOrRegretMode(complain_or_regret_mode: string){
    this.complain_or_regret_mode = complain_or_regret_mode;
  }


  //-----------------------------
  // GETTERS
  //-----------------------------

  getUserTypeSubject(): Observable<string>{
    return this.userType$;
  }

  // Método que nos obtendra desde nuestro servicio los items para el menu del perfil de voluntarios
  getVoluntaryMenuItems(): Observable<ItemMenu[]>{
    return this.http.get<ItemMenu[]>('assets/data/menuVoluntaryData.json');
  }

   // Método que nos obtendra desde nuestro servicio los items para el menu del perfil de solicitantes
  getPetitionerMenuItems(): Observable<ItemMenu[]>{
    return this.http.get<ItemMenu[]>('assets/data/menuPetitionerData.json');
  }

  getPetitionerEditProfileMenuItems(){
    return this.http.get<ButtonEditProfileOptions[]>('assets/data/editProfilePetitionerButons.json');
  }

  getVoluntaryEditProfileMenuItems(){
    return this.http.get<ButtonEditProfileOptions[]>('assets/data/editProfileVoluntaryButons.json');
  }

  //Nos cambiará el contenido de la variable para que cambie el estilo del formulario
  public getUserType(){
    return this.userType;
  }

  //Nos devuelve el sexo del usuario
  public getSexUserType(){
    return this.userSex;
  }

  // Nos devuelve el DOCID de la tarea actual
  public getCurrentTaskDocID(){
    return this.currentTaskDocID;
  }

  //Nos cambiará el contenido de la variable para que cambie el estilo del formulario de los perfiles de voluntario y solicitante
  public getStyleInputDataForm(){
    return this.styleInputDataForm;
  }

  // Nos devuelve las propiedades de los uduarios
  public getUserProperties(){
    return this.userProperties;
  }

  public getComplainOrRegretMode() : string{
    return this.complain_or_regret_mode;
  }

  // Nos dará la valoracion para dibujar la estrella en el componente
  getValorationbyPunctuation(starPuntuation: number): string {
    let result;
    switch(starPuntuation){
      case 0: {
        result = 'superbad++';
        break;
      }
      case 1: {
        result = 'superbad';
        break;
      }
      case 2: {
        result = 'bad';
        break;
      }
      case 3: {
        result = 'nice+';
        break;
      }
      case 4: {
        result = 'excellent';
        break;
      }
      case 5: {
        result = 'excellent++';
        break;
      }
    }
    return result;
  }
}
