import { taskInProgress, taskUnassigned, userTypeVoluntary } from '../Models/Globals';
import { Petitioner } from '../Models/Clases/Petitioner';
import { Voluntary } from '../Models/Clases/Voluntary';
import { Task } from '../Models/Clases/Extra_Clases';
import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Commentary, Conversation, User } from '../Models/Interfaces/AllInterfaces';
import { Score } from '../Models/Clases/Extra_Clases';
import firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { Tutor } from '../Models/Clases/PetitionerTutor';
import { AngularFireAuth } from '@angular/fire/auth';

// Servicio vinculado a la base de Datos de Firebase.
// Nos realizará las consultas correspondientes y las funciones de CRUD
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  user: User;
  newTaskUploaded$ = new EventEmitter<boolean>();

  // Atributos para filtrar la búsqueda de tareas del voluntario
  taskRefresher$ = new EventEmitter<string>();
  cityFilter: string;
  categoryFilter: string;


  // Constructor
  constructor(
    private angularFirestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private http: HttpClient
  ) {}

  //--------------------------------
  // MÉTODOS
  //--------------------------------

  //------------------------------
  // Métodos referente al usuario
  //------------------------------

  // -------------
  // Métodos del registro del usuario
  // -------------

  // Añade un nuevo usuario a nuestra Base de datos en Firebase
  public createNewUser(user: User) {
    this.angularFirestore.collection('User').add(user);
  }

  // -------------
  // Métodos del logeo del usuario
  // -------------

  // Método que nos comprobará su ese usuario existe o no
  public async existsUser(uuid: string): Promise<boolean> {
    const res = await this.angularFirestore.collection('User')
      .ref.where('uuid', '==', uuid).get();
    return res.size > 0;
  }

  // Nos devuelve el usuario actual
  public async getUser(): Promise<User> {
    let user_uuid = firebase.auth().currentUser.uid;
    const res = await this.angularFirestore.collection('User').ref.where('uuid', '==', user_uuid).get();

    if (res.size > 0) {
      return res.docs[0].data() as User;
    }
    return null;
  }

  // Nos devuelve el usuario a través de su UID
  public async getUserByUID(user_uuid: string): Promise<User> {
    const res = await this.angularFirestore.collection('User').ref.where('uuid', '==', user_uuid).get();

    if (res.size > 0) {
      return res.docs[0].data() as User;
    }
    return null;
  }


  // Nos devuelve el doc_ID del usuario para poder hacer comprobaciones
  public async getUserDocID(): Promise<string> {
    var uuid = firebase.auth().currentUser.uid;
    const res = await this.angularFirestore.collection('User').ref.where('uuid', '==', uuid).get();

    if (res.size > 0) {
      return res.docs[0].id;
    }
    return null;
  }

  // Nos devuelve el user_ID del usuario actual
  public async getUserUID(): Promise<string> {
    return firebase.auth().currentUser.uid;
  }

  // Nos edita7actualiza el tipo de perfil que tiene el usuario
  public async updateCurrentUserType(userType: string): Promise<boolean> {
    var uuid = firebase.auth().currentUser.uid;
    const res = await this.angularFirestore.collection('User')
      .ref.where('uuid', '==', uuid).get();

    if (res.size > 0) {
      var userBD = res.docs[0].data() as User;
      userBD.userType = userType;
      this.angularFirestore.collection('User').doc(res.docs[0].id).set(userBD);
      return true;
    }
    return false;
  }

  // Nos borra permanentemente los datos del usuario que querramos borrar
  public async deleteUser(): Promise<boolean> {
    return false; //TODO si da tiempo
  }

  //------------------------------
  // Métodos referente al Voluntario
  //------------------------------

  //Voluntary collection database

  // Nos devuelve los datos del voluntario actual
  public async getProfileVoluntary(): Promise<Voluntary> {
    const userUID = await this.getUserUID();
    const res = await this.angularFirestore.collection('Voluntary')
    .ref.where('uid', '==', userUID).get();

    if (res.size > 0) {
      let vol = Object.assign(new Voluntary(), res.docs[0].data());
      vol.doc_id = res.docs[0].id;

      return vol
      //return res.docs[0].data() as Voluntary;
    } else {
      return null;
    }
  }

  // Nos devuelve los datos de un voluntario a través de su UID
  public async getVoluntaryByUID(userUID: string): Promise<Voluntary>{
    const res = await this.angularFirestore.collection('Voluntary')
    .ref.where('uid', '==', userUID).get();

    if (res.size > 0) {
      let vol = Object.assign(new Voluntary(), res.docs[0].data());
      vol.doc_id = res.docs[0].id;

      return vol
      //return res.docs[0].data() as Voluntary;
    } else {
      return null;
    }
  }

  // Nos devuelve el nombre de un voluntary dado su id del documento (doc.ID)
  public async getVoluntaryByDocID(voluntaryDocID: string): Promise<Voluntary> {
    const res =  await this.angularFirestore.collection('Voluntary').doc(voluntaryDocID).get().toPromise();

    if(res.exists){
      const vol = res.data() as Voluntary;
      vol.doc_id = res.id;
      return vol;
    }else{
      return null;
    }
  }


  public async updateProfileVoluntary(voluntary: Voluntary){
    const voluntaryDOCID = (await this.getProfileVoluntary()).getDocID();

    // Transformar de objeto JS a JSON
    voluntary.setAddress(Object.assign ({}, voluntary.getAddress()));
    const voluntaryObj = Object.assign ({}, voluntary);

    this.angularFirestore.collection('Voluntary')
    .doc(voluntaryDOCID).update(voluntaryObj)
    .then( (resp) =>{
      console.log('nice!');
      return true;
    })
    .catch( (err)=>{
      console.log('boo ):');
      return false;
    });
  }

  //------------------------------
  // Métodos referente al Solicitante
  //------------------------------

  // Nos devuelve el solicitante actual
  public async getProfilePetitioner(): Promise<Petitioner> {
    const userUID = await this.getUserUID();
    console.log(userUID)
    const res = await this.angularFirestore
      .collection('Petitioner')
      .ref.where('uid', '==', userUID)
      .get();
    if (res.size > 0) {
      let pet = res.docs[0].data() as Petitioner;
      pet.doc_id = res.docs[0].id;
      console.log(pet)
      return pet;
    }
    return null;
  }

  // TODO docID
  public async updateProfilePetitioner( petitioner: Petitioner ){
    const petitionerDOCID = (await this.getProfilePetitioner()).getID();

    // Transformar de objeto JS a JSON
    petitioner.setAddress(Object.assign ({}, petitioner.getAddress()));
    const petitionerObj = Object.assign ({}, petitioner);

    this.angularFirestore.collection('Petitioner')
    .doc(petitionerDOCID).update(petitionerObj)
    .then( (resp) =>{
      console.log('nice!');
      return true;
    })
    .catch( (err)=>{
      console.log('boo ):');
      return false;
    });
  }

  // Nos devuelve el nombre de un petitioner dado su id de susario
  public async getPetitionerByUID(petitionerUID: string): Promise<Petitioner> {
    const res = await this.angularFirestore.collection('Petitioner')
    .ref.where('uid', '==', petitionerUID).get();

    if (res.size > 0) {
      const petitioner = res.docs[0].data() as Petitioner;
      petitioner.doc_id = res.docs[0].id;
      return petitioner;
    }
    return null;
  }

  // Nos devuelve el nombre de un petitioner dado su id del documento (doc.ID)
  public async getPetitionerByDocID(petitionerDocID: string): Promise<Petitioner> {
    const res =  await this.angularFirestore.collection('Petitioner').doc(petitionerDocID).get().toPromise();

    if(res.exists){
      const petitioner = res.data() as Petitioner;
      petitioner.doc_id = res.id;
      return petitioner;
    }else{
      return null;
    }
  }

  //------------------------------
  // Métodos referente al Tutor
  //------------------------------
  // Nos devuelve el tutor a través del user_DocID actual
  public async getProfileTutor(): Promise<Tutor> {
    const userDocId = await this.getUserDocID();
    const res = await this.angularFirestore.collection('Tutor')
    .ref.where('user_doc_id', '==', userDocId).get();

    if (res.size > 0) {
      return res.docs[0].data() as Tutor;
    }
    return null;
  }

  // Nos devuelve un tutor a través de su user_docID
  public async getProfileTutorByUserDocID(userDocID : string): Promise<Tutor> {
    const res = await this.angularFirestore.collection('Tutor')
    .ref.where('user_doc_id', '==', userDocID).get();

    if (res.size > 0) {
      return res.docs[0].data() as Tutor;
    }
    return null;
  }

  //------------------------------
  // Métodos referente a las Tareas
  //------------------------------

  public setTasksFilterCategories(taskCategory: string){
    this.categoryFilter = taskCategory;
  }

  public setTasksFilterCity(city: string){
    this.cityFilter = city;
  }



  // Nos devuelve las tareas filtradas por la ciudad de donde es el Voluntario o a deseada
  public async getTasksVoluntaryCity(): Promise<Task[]> {
    let citySearch: string;
    let taskList: Task[] = [];

    if(this.cityFilter == undefined || this.cityFilter == ''){
      const profileVoluntary: Voluntary = (await this.getProfileVoluntary()) as Voluntary;
      citySearch = profileVoluntary.getAddress().city;
    }else{
      citySearch = this.cityFilter;
    }

    this.angularFirestore.collection('Task')
      // Filtramos por ciudad
      .ref.where('addCity', '==', citySearch).get()
      .then((tasksNearVoluntaryListDB) => {
        if (tasksNearVoluntaryListDB.size > 0) {
          tasksNearVoluntaryListDB.forEach((task: any) => {
            const taskDB: Task = task.data() as Task;
            taskDB.docID = task.id;

            if (taskDB.voluntaryDOC_ID == null || taskDB.voluntaryDOC_ID.length <= 0) {
              taskList.push(taskDB);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
      console.log(taskList)
    return taskList;
  }

  // Nos devuelve las tareas filtradas por la ciudad de donde es el Voluntario y alrededores
  public async getTasksNearVoluntaryCity(cities: string[]): Promise<Task[]> {
    let taskList: Task[] = [];
    if (cities.length >= 1) {
      cities.forEach(async (elem) => {
        const tasksNearVoluntaryListDB = await this.angularFirestore.collection('Task').ref
        .where('state', '==', 'Unassigned')
        .where('addCity', '==', elem).get();

        if (tasksNearVoluntaryListDB.docs.length > 0) {
          tasksNearVoluntaryListDB.forEach((task: any) => {
            const taskDB: Task = task.data() as Task;
            taskDB.docID = task.id;

            // console.log(taskDB)
            if (taskDB.voluntaryDOC_ID == null || taskDB.voluntaryDOC_ID == undefined ) {
              taskList.push(taskDB);
            }
          });
        }
      });
      console.log(taskList)
      return taskList;
    }
  }


   // Nos devuelve las tareas filtradas por categorías
   // Sino, nos devuelve las de la ciudad del Voluntario
   public async getTasksByCategories(): Promise<Task[]> {
    let taskList: Task[] = [];
    let citySearch: string;

    if(this.categoryFilter != undefined || this.categoryFilter.length >= 0){

      if(this.cityFilter == undefined || this.cityFilter == ''){
        const profileVoluntary: Voluntary = (await this.getProfileVoluntary()) as Voluntary;
        citySearch = profileVoluntary.getAddress().city;
      }else{
        citySearch = this.cityFilter;
      }

      console.log(citySearch)

      this.angularFirestore.collection('Task')
        // Filtramos por ciudad
        .ref.where('addCity', '==', citySearch).where('category', '==', this.categoryFilter).get()

        .then((tasksNearVoluntaryListDB) => {
          if (tasksNearVoluntaryListDB.size > 0) {
            tasksNearVoluntaryListDB.forEach((task: any) => {
              const taskDB: Task = task.data() as Task;
              taskDB.docID = task.id;

              if (taskDB.voluntaryDOC_ID == null || taskDB.voluntaryDOC_ID.length <= 0) {
                taskList.push(taskDB);
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
        console.log(taskList)
        return taskList;
    }else{
      this.getTasksVoluntaryCity();
    }
  }


  // Nos devuelve todas las tareas asignadas al usuario
  // ya sea este voluntario o solicitante
  public async getUserTask() {
    const user = await this.getUser();
    if (user.userType == userTypeVoluntary) {
      return this.getTasksVoluntary();
    } else {
      return this.getTasksPetitioner();
    }
  }

  //Nos obtiene todas las tareas que ha realizado el voluntario
  private async getTasksVoluntary(): Promise<Task[]> {
    console.log('enter getTasksVoluntary');
    const profileVoluntary = await this.getProfileVoluntary();

    const taskVoluntaryListDB = await this.angularFirestore.collection('Task').ref
    .where('voluntaryDOC_ID', '==', profileVoluntary.getDocID())
    .where('state', '!=', taskUnassigned).get();

    var taskList: Task[] = [];

    if (taskVoluntaryListDB.size > 0) {
      taskVoluntaryListDB.forEach((task: any) => {
        const taskDB = task.data() as Task;
        taskDB.docID = task.id;
        taskList.push(taskDB);
      });
    }
    // console.log(taskList)
    return taskList;
  }

  //Nos obtiene una tarea concreta a traves del document ID
  public async getTaskByDocId(id: string): Promise<Task> {
    return (await this.angularFirestore.collection("Task").doc(id).get().toPromise()).data() as Task;

    // Le falta el id


    // Obtiene también los datos pero falla la asincronía
    // var taskByDocID: Task;
    // this.angularFirestore.collection("Task").get().toPromise()
    // .then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //       // console.log(`${doc.id} => ${doc.data()}`);

    //       if(doc.id == id){
    //         taskByDocID = doc.data() as Task;
    //         console.log(taskByDocID)
    //       }

    //     });
    //   })
    // .catch((err) => { console.log(err)});

    // console.log(taskByDocID)
    // return taskByDocID;
  }

  // Nos devuelve las tareas que tienen el userID del Solicitante/Petitioner
  private async getTasksPetitioner(): Promise<Task[]> {
    const profilePetitioner = (await this.getProfilePetitioner()) as Petitioner;

    const tasksPetitionerListDB = await this.angularFirestore
      .collection('Task').ref.where('petitionerDOC_ID', '==', profilePetitioner.doc_id)
      .get();

    var taskList: Task[] = [];
    if (tasksPetitionerListDB.docs.length > 0) {
      tasksPetitionerListDB.docs.forEach( (task) => {
        const taskDB = task.data() as Task;
        taskDB.docID = task.id;

        taskList.push(taskDB);
      });
      console.log(taskList)
    }
    return taskList;
  }

  // Nos crea nuestra tarea en nuestra Base de Datos
  // Y nos dice si esta se ha creado o ha tenido un error
  public async createTask(task: Task): Promise<boolean> {
    console.log('create Task');
    return this.angularFirestore.collection('Task').add(Object.assign({}, task))
      .then((docRef) => {
        this.newTaskUploaded$.emit(true);
        return true;
      })
      .catch((error) => {
        return false;
      });
  } // FIN - createTask

  // Nos actualiza una tarea en nuestra DB en Firebase
  public updateTask(task: Task): Promise<boolean> {
    return this.angularFirestore.collection('Task').doc(task.docID).update(task)
    .then((docRef) => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
  }

  // Nos borra una tarea en nuestra DB en Firebase
  public deleteTask(task: Task): Promise<boolean> {
    return this.angularFirestore.collection('Task').doc(task.docID).delete()
    .then((docRef) => {
      return true;
    })
    .catch((error) => {
      return false;
    });;
  }


  // Nos cambia la tarea a otra tabla, para cuando estas están finalizadas
  public async createTaskOnTaskDone(task: Task): Promise<boolean> {
    return this.angularFirestore.collection('Task-Done').add(Object.assign({}, task))
      .then((docRef) => {
        this.newTaskUploaded$.emit(true);
        return true;
      })
      .catch((error) => {
        return false;
      });
  } // FIN - createTask

  //------------------------------
  // Métodos referente a las Puntuaciones de los usuarios
  //------------------------------
  //Score collection database

  // Para todos los usuarios no sólo los voluntarios
  public async getScores(): Promise<Score[]> {
    let currentUser: Petitioner | Voluntary ;
    const user = await this.getUser();
    console.log(user)

    if(user.userType === userTypeVoluntary){
      currentUser = await this.getProfileVoluntary();
    }else{
      currentUser = await this.getProfilePetitioner();
    }

    console.log(currentUser)

    const scoreListDB = await this.angularFirestore.collection('Score')
      .ref.where('userDOC_ID', '==', currentUser.doc_id).get();

    let scoreList: Score[] = [];
    if (scoreListDB.size > 0) {
      scoreListDB.forEach((score: any) => {
        scoreList.push(score.data());
      });
    }
    return scoreList;
  }

  // Nos devuelve la media de las puntuaciones de los usuarios
  async getUserMediaScore(): Promise<number | PromiseLike<number>> {
    const scores = await this.getScores();
    let numScores : number = 0;
    let averageScore : number = 0;

    scores.forEach( (score: Score) =>{
      averageScore += Number(score.puntuation);
      numScores++;
    });
    return averageScore/numScores;
  }

  public async createNewScore(score: Score) : Promise<boolean> {
    return this.angularFirestore.collection('Score').add(Object.assign({}, score))
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  //ejemplo de comentario. Habrá que cambiarlo, obtener la ruta de la imagen y los datos de Score
  public getCommentaries() {
    return this.http.get<Commentary[]>('assets/data-test/test.json');
  }

  //Método que a partir de la puntuación del usuario le dará una valoración para que
  // se vea reflejada con las estrellas
  giveValoration(puntuation: number) {
    // Ninguna estrella
    if (puntuation === 0) {
      return `superbad++`;
    }

    // Media Estrella
    if (puntuation > 0 && puntuation <= 0.5) {
      return `superbad+`;
    }

    // Una Estrella
    if (puntuation > 0.5 && puntuation <= 1) {
      return `superbad`;
    }

    // Una Estrella y media
    if (puntuation > 1 && puntuation <= 1.5) {
      return `bad+`;
    }

    // Dos Estrellas
    if (puntuation > 1.5 && puntuation <= 2) {
      return `bad`;
    }

    // Dos Estrellas y media
    if (puntuation > 2 && puntuation <= 2.5) {
      return `nice`;
    }

    // Tres Estrellas
    if (puntuation > 2.5 && puntuation <= 3) {
      return `nice+`;
    }

    // Tres Estrellas y media
    if (puntuation > 3 && puntuation <= 3.5) {
      return `nice++`;
    }

    // Cuatro Estrellas
    if (puntuation > 3.5 && puntuation <= 4) {
      return `excellent`;
    }

    // Cuatro Estrellas y media
    if (puntuation > 4 && puntuation <= 4.5) {
      return `excellent+`;
    }

    // Cinco Estrellas
    if (puntuation > 4.5 && puntuation <= 5) {
      return `excellent++`;
    }
  }

  //------------------------------
  // Métodos referente a los mensajes de los usuarios
  //------------------------------

  // añadimos la lista de que usuarios están teniendo conversaciones mutuamente a través de su uid
  async addChatRoomOnDatabase(currentUserUID: string, uid: string): Promise <boolean> {
    return this.angularFirestore.collection('Conversations')
      .ref.where('uuid', '==', currentUserUID).get()
      .then( (res)=> {
         // Si existe hacemos un update
        if(res.size > 0){
          const conversation = res.docs[0].data() as Conversation;
          conversation.docID = res.docs[0].id;
          let existsConversation = false;

          // Comprobamos que no hay conversacion previa
          for (let userID of conversation.usersUidlist){
            if(userID === uid){
              existsConversation = true;
            }
          }

          if(!existsConversation){
            conversation.usersUidlist.unshift(uid);
            this.angularFirestore.collection("Conversations").doc(conversation.docID).update({
              uuid: currentUserUID,
              usersUidlist: conversation.usersUidlist
            })
            .then(() => { return true})
            .catch(() => {return false});

          }else{
            return true;
          }
        // Sino existe insertamos el usuario
        }else{
          console.log('usuario no existe')
          this.angularFirestore.collection("Conversations").add({
            uuid: currentUserUID,
            usersUidlist: [uid]
          })
          .then(() => {return true;})
          .catch(() => {return false;});
        }
      })
    .catch((err)=> {
      console.log(err);
      return false;
    });
  }

  async getAllConversationsWithUsers(): Promise<string[]> {
    let currentUserUID = await this.getUserUID();
    let userConversationList: string[] = [];

    return this.angularFirestore.collection('Conversations')
    .ref.where('uuid', '==', currentUserUID).get()

    .then( (resp) => {
      if(resp.size > 0){
        let conversationData = resp.docs[0].data() as Conversation;
        conversationData.usersUidlist.forEach((userUID) =>{
          userConversationList.push(userUID);
        });
      }
      return userConversationList;
    })
    .catch((err)=>{
      return userConversationList
    })
  }


  //-------------------------------
  // COMPLAIN / QUEJAS
  //-------------------------------

  // Nos crea una queja en nuestra Base de Datos
  createComplain(text: string, complainantUid: string, accusedUid: string, reportable: boolean) {
    return this.angularFirestore.collection('Complains').add({
      text: text,
      uuidComplainant: complainantUid,
      uuidAccused: accusedUid,
      reportable: reportable
    });
  }

  // IMAGENES
  uploadProfileImage(imageName: string, imageFile: File) {}

  getUserProfileImage(voluntaryId: string): string {
    return '../../assets/img/user-icon.png';
  }

  // TODO: Foto de perfil del usuario actual
  getProfilePhoto(sex: string): string {
    let urlIMG;
    if (sex === 'Male') {
      urlIMG = '../../assets/img/mas-user-icon.png';
    } else if (sex === 'Female') {
      urlIMG = '../../assets/img/fem-user-icon.png';
    } else {
      urlIMG = '../../assets/img/user-icon.png';
    }
    return urlIMG;
  }

  // Nos devuelve una imagen predeterminada del perfil dependiendo del sexo que haya elegido el usuario
  async getProfileImagePredeterminated(sex: string): Promise<string> {
    let imgURL: string;
    let storage = firebase.storage();
    let directoryPath = `iconos-foto-perfil/`;
    let pathReference;

    if (sex === 'Male') {
      pathReference = storage.ref(directoryPath + 'mas-user-icon.png');
    } else if (sex === 'Female') {
      pathReference = storage.ref(directoryPath + 'fem-user-icon.png');
    } else {
      pathReference = storage.ref(directoryPath + 'user-icon.png');
    }

    imgURL = await pathReference.getDownloadURL();
    return imgURL;
  }

  // Nos devolverá las imágenesde las cualidades/problemas del usuario dependiendo de sí es un voluntario o solicitante
  async getUserImages(
    userType: string,
    qualities: string[]
  ): Promise<string[]> {
    let imgURLS: string[] = [];
    let storage = firebase.storage();
    let imgPaths: string;

    if (userType == userTypeVoluntary) {
      imgPaths = `iconos-voluntario/`;
    } else {
      imgPaths = `iconos-solicitante/`;
    }
    qualities.forEach((imageName) => {
      let pathReference = storage.ref(imgPaths + imageName);
      pathReference.getDownloadURL().then(function (imgUrl) {
        imgURLS.push(imgUrl);
      });
    });
    return imgURLS;
  }
}


