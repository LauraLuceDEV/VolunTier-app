import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatUsersListPageRoutingModule } from './chat-users-list-routing.module';
import { ChatUsersListPage } from './chat-users-list.page';


// Componente
import { ChatUserPanelComponent } from '../../Components/chat-user-panel/chat-user-panel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatUsersListPageRoutingModule
  ],
  declarations: [ChatUsersListPage, ChatUserPanelComponent]
})
export class ChatUsersListPageModule {}
