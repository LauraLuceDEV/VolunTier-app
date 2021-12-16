import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { Petitioner } from 'src/app/Models/Clases/Petitioner';
import { TypeSexList, userTypeVoluntary } from 'src/app/Models/Globals';
import { User } from 'src/app/Models/Interfaces/AllInterfaces';
import { ChatService } from 'src/app/Providers/chat.service';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';
import { DatabaseService } from 'src/app/Providers/database.service';
import { Voluntary } from '../../Models/Clases/Voluntary';
import {formatDate} from '@angular/common';
import { ChatUser } from 'src/app/Models/Clases/Extra_Clases';

@Component({
  selector: 'app-chat-user-panel',
  templateUrl: './chat-user-panel.component.html',
  styleUrls: ['./chat-user-panel.component.scss'],
})
export class ChatUserPanelComponent implements OnInit {
  secretKey: string = "123456&Descryption";
  // Valores para mostrar en el chat
  profileImgURL: string;

  currentUserUID: string;
  usersUIDList: string[];
  userType = '';
  users: User[] = [];
  userConversationList: any = [];

  constructor(private router: Router,
    private dimService: DataItemModelsService,
    private databaseServ: DatabaseService,
    private chatService: ChatService) { }

  async ngOnInit() {
    this.usersUIDList = await this.databaseServ.getAllConversationsWithUsers();
    this.currentUserUID = await this.databaseServ.getUserUID();
    this.userType = this.dimService.getUserType();

    if(this.userType === userTypeVoluntary){
      this.chargePetitionersData();
    }else{
      this.chargeVoluntaryData();
    }
  }

  // Nos carga los datos de los Solicitantes si el usuario es de tipo voluntario
  chargePetitionersData() {
    this.usersUIDList.forEach( (element) =>{
      this.chatService.getChatMessages(this.currentUserUID, element)
      .subscribe(
        async (chat) => {
          console.log(chat);
          if(chat.length > 0){
            let pet: Petitioner = await this.databaseServ.getPetitionerByUID(element);
            let chatUser = new ChatUser();
            chatUser.name = pet.name;
            chatUser.surname = pet.surname;
            chatUser.sex = pet.sex;
            chatUser.lastMessage = chat[chat.length -1].content;
            chatUser.uuid = pet.uid;
            chatUser.lastDateMsg = chat[0].createdAt.toDate().toString();

            this.userConversationList.push(chatUser);

          }else{
            let pet: Petitioner = await this.databaseServ.getPetitionerByUID(element);
            let chatUser = new ChatUser();
            chatUser.name = pet.name;
            chatUser.surname = pet.surname;
            chatUser.uuid = pet.uid;
            chatUser.sex = pet.sex;
            chatUser.lastMessage = 'No messages yet';
            chatUser.lastDateMsg = Date.now().toString();
            this.userConversationList.push(chatUser);
          }
        },
        (err) => {
          console.log("Error caught at Subscriber " + err)
        }
      );
    });
  }

  // Nos carga los datos de los Voluntarios si el usuario es de tipo solicitante
  chargeVoluntaryData() {
    this.usersUIDList.forEach( (element) =>{
      this.chatService.getChatMessages(this.currentUserUID, element)
      .subscribe(
        async (chat) => {
          if(chat.length > 0){
            let vol: Voluntary = await this.databaseServ.getVoluntaryByUID(element);
            let chatUser = new ChatUser();
            chatUser.name = vol.name;
            chatUser.surname = vol.surname;
            chatUser.uuid = vol.uid;
            chatUser.sex = vol.sex;
            chatUser.lastMessage = chat[chat.length -1].content;
            chatUser.lastDateMsg = chat[0].createdAt.toDate().toString();
            this.userConversationList.push(chatUser);
          }else{
            let vol: Voluntary = await this.databaseServ.getVoluntaryByUID(element);
            let chatUser = new ChatUser();
            chatUser.name = vol.name;
            chatUser.surname = vol.surname;
            chatUser.uuid = vol.uid;
            chatUser.sex = vol.sex;
            chatUser.lastMessage = 'No messages yet';
            chatUser.lastDateMsg = Date.now().toString();
            this.userConversationList.push(chatUser);
          }
        },
        (err) => {
          console.log("Error caught at Subscriber " + err)
        }
      );
    });
  }

  goTochat(userUID: string){
    this.router.navigateByUrl(`chat/${this.currentUserUID}/${userUID}`);
  }
}
