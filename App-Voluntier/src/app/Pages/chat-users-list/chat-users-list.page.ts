import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';
import { DatabaseService } from 'src/app/Providers/database.service';

@Component({
  selector: 'app-chat-users-list',
  templateUrl: './chat-users-list.page.html',
  styleUrls: ['./chat-users-list.page.scss'],
})
export class ChatUsersListPage implements OnInit {
  userType = '';

  constructor(private dimService: DataItemModelsService,
    private router: Router,
    private databaseService: DatabaseService) {
    this.userType = this.dimService.getUserType();
  }

  ngOnInit() {}

  goBackPage(){
    this.router.navigateByUrl('user-profile');
  }
}
