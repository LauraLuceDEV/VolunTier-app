import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { ChatService } from 'src/app/Providers/chat.service';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';
import { DatabaseService } from 'src/app/Providers/database.service';
import { Message } from 'src/app/Models/Interfaces/AllInterfaces';
import { userTypeVoluntary } from 'src/app/Models/Globals';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  messages: Observable<Message[]>;
  msgContent: string = '';
  msgEmitter: string = '';
  msgReceiver: string = '';
  msgEmitterName: string = '';
  secretKey: string = "123456&Descryption";
  userType: string = '';


  constructor(private chatService: ChatService,
    private databaseService: DatabaseService,
    private router: Router,
    private dimService: DataItemModelsService,
    private actRoute: ActivatedRoute,) { }

  async ngOnInit() {
    this.msgEmitter = this.actRoute.snapshot.paramMap.get('transmitterUID');
    this.msgReceiver = this.actRoute.snapshot.paramMap.get('receptorUID');
    this.userType = this.dimService.getUserType();

    this.messages = this.chatService.getChatMessages(this.msgEmitter, this.msgReceiver)
  }

  goBackPage(){
    this.router.navigateByUrl('chat-users-list');
  }

  sendMessage() {
    this.databaseService.getUserByUID(this.msgEmitter)
    .then( (user) => {
      if(user.userType === userTypeVoluntary){
        this.databaseService.getVoluntaryByUID(this.msgEmitter)
        .then( (vol) => {
          let userName = `${vol.name} ${vol.surname}`;
          this.chatService.addChatMessage(this.msgContent, this.msgReceiver, userName).then(() => {
            this.msgContent = '';
            this.content.scrollToBottom();
          });
        })
        .catch((err) => {
          console.error(err);
        });
      }else{
        this.databaseService.getPetitionerByUID(this.msgEmitter)
        .then( (pet) => {
          let userName = `${pet.name} ${pet.surname}`;
          this.chatService.addChatMessage(this.msgContent, this.msgReceiver, userName).then(() => {
            this.msgContent = '';
            this.content.scrollToBottom();
          });
        })
        .catch((err) => {
          console.error(err);
        });
      }
    })
    .catch((err) => {
      console.error(err);
    })
  }


  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

}
