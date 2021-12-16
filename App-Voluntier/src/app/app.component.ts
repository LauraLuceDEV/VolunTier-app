import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  //Constructor
  constructor(
    private platform: Platform,
    public router: Router
  ) {
    this.initializeApp();
  }

  // Para iniciar nuestra APP con un splash
  initializeApp(){
    this.platform.ready().then(() =>{
      this.router.navigateByUrl('splash-app');
    });
  }
}
