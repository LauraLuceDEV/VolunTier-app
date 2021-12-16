/*Aquí irán todas las clases extras que necesitaremos para crear nuestros objetos*/

//Clase tarea, dónde irán descritas las tareas de los perfiles de los solicitantes
export class Task{
    docID: string;
    name: string;
    description: string;
    creationDate: number;
    category: string;
    address: string;
    addCity: string;
    addPC: string;
    addStreet: string;
    addCountry: string;
    petitionerDOC_ID: string;
    voluntaryDOC_ID: string;
    state: string;

    constructor(name: string, description: string, creationDate: number, category: string,
        address: string, petitionerDOC_ID: string, state: string,
        addStreet: string, addCity: string, addPC:string, addCountry:string){
        this.name = name;
        this.description = description;
        this.category = category;
        this.petitionerDOC_ID = petitionerDOC_ID;
        this.state = state;
        this.creationDate = creationDate;
        this.address = address;
        this.addStreet = addStreet;
        this.addCity = addCity;
        this.addPC = addPC;
        this.addCountry = addCountry;
    }
}

//Clase que nos ayudará cuando obtengamos las ciudades de la API GeoDB Cities
export class CityGPS{
    id: string;
    city: string;
    country: string;
    countryCode: string;
    region: string;
  }

  //Clase que englobará a la clase CityGPS
  // y nos ayudará cuando obtengamos las ciudades de la API GeoDB Cities
  export class DataCity{
    data: CityGPS[];
  }

  //Clase que nos ayudará cuando obtengamos las coordenadas de la API PositionStack
  export class Results{
    latitude: number;
    longitude: number;
  }

  //Clase que englobará a la clase Results
  // y nos ayudará cuando obtengamos las ciudades de la API PositionStack
  export class DataCoordinates{
    data: Results[];
  }


export class ChatUser{
  sex: string;
  uuid: string;
  name: string;
  surname: string;
  lastMessage: string;
  lastDateMsg: string;
}

// Clase dirección
export class Address{
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

 //Clase mensaje, dónde irán reflejados los mensajes que se envían cada uno
export class Message{
    messageContent: string;
    userFrom: string;
    userTo: string;
    timestamp: number;
}

//Clase puntuación, dónde irán las opiniones de ambos
export class Score{
  DOC_ID: string;
  taskID: string;
  userDOC_ID: string
  userCommentDOC_ID: string
  userType : string
  comment: string;
  puntuation: number;
  userValoration : string;

  constructor(taskID: string, userDOC_ID: string, userCommentDOC_ID: string, userType: string, commentary: string, puntuation: number, userValoration : string){
    this.taskID = taskID;
    this.userDOC_ID = userDOC_ID;
    this.userCommentDOC_ID = userCommentDOC_ID;
    this.userType = userType;
    this.comment = commentary;
    this.puntuation = puntuation;
    this.userValoration = userValoration;
  }
}

export class Comment{
  userProfileImageRoute: string;
  userName: string;
  userValoration: string;
  userOpinion: string

  constructor(userProfileImageRoute: string, userName: string, userValoration: string, userOpinion: string){
    this.userProfileImageRoute = userProfileImageRoute;
    this.userName = userName;
    this.userValoration = userValoration;
    this.userOpinion = userOpinion;
  }
}
