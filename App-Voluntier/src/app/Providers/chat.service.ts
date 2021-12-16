import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { switchMap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { Message, User } from 'src/app/Models/Interfaces/AllInterfaces';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUserUID: string = null;
  secretKey = "123456&Descryption";


  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUserUID = user.uid;
    });
  }


  // Chat functionality

  addChatMessage(msg: string, receiver: string, userName: string) {
    return this.afs.collection('messages').add({
      content: this.encrypt(msg.trim()),
      from: this.currentUserUID,
      emitterName: userName,
      to: receiver,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  // Nos devuelve todos los mensajes de ambos usuarios
  getChatMessages(emitterUID: string, receiverUID: string): Observable<Message[]> {
    let messages = this.afs.collection('messages', ref => ref.orderBy('createdAt'))
        .valueChanges({ idField: 'id' }) as Observable<Message[]>;

    return messages.pipe(
      map(msgList => {
        for (let m of msgList) {
          m.myMsg = emitterUID === m.from;
          m.content= this.decrypt(m.content);
        }
        return msgList.filter(m => {
          return (m.from == emitterUID || m.from == receiverUID) && (m.to == emitterUID || m.to == receiverUID);
        });
      })
    );



    /*let users = [];
    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('messages', ref => ref.orderBy('createdAt')
        .where('from', 'in', [receiverUID, emitterUID]))
        .valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),
      map(messages => {
        for (let m of messages) {
          m.myMsg = emitterUID === m.from;
          m.content= this.decrypt(m.content);
        }
        return messages
         .filter( (m) => {
           (m.from == emitterUID || m.from == receiverUID) && (m.to == emitterUID || m.to == receiverUID);
         });
      })
    )*/
  }

  filterChatByUsers(messages: Message[], emitterUID: string, receiverUID: string): Message[] {
    return messages
    .filter( (m) => {
      (m.from == emitterUID || m.from == receiverUID) && (m.to == emitterUID || m.to == receiverUID);
    });
  }

private getUsers() {
  return this.afs.collection('user').valueChanges({ idField: 'uuid' }) as Observable<User[]>;
}

private getUserForMsg(msgFromId, users: User[]): string {
  for (let usr of users) {
    if (usr.uuid == msgFromId) {
      return usr.email;
    }
  }
}



  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
