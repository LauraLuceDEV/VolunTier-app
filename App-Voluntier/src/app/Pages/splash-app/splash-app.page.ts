import { DatabaseService } from '../../Providers/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataItemModelsService } from '../../Providers/data-item-model.service';


// Página de inicio de la aplicación
// Nos ejecutará una animación cuando la abramos
@Component({
  selector: 'app-splash-app',
  templateUrl: './splash-app.page.html',
  styleUrls: ['./splash-app.page.scss'],
})
export class SplashAppPage implements OnInit {

  //Constructor
  constructor(private afAuth: AngularFireAuth,
    private databaseService: DatabaseService,
    private dimService: DataItemModelsService,
    private router: Router) {
    setTimeout(()=>{
      afAuth.currentUser.then((user) => {
        if(user != null){
          databaseService.getUser().then((userFromFB) => {
            if(userFromFB != null){
              if(userFromFB.userType != null && userFromFB.userType.length > 0){
                this.dimService.setUserType(userFromFB.userType);
                this.router.navigateByUrl('user-profile');
              } else {
                this.router.navigateByUrl('choose-profile');
              }
            }else{
              this.router.navigateByUrl('login-menu');
            }
          });
        } else {
          this.router.navigateByUrl('login-menu');
        }
      });
    }, 3000);
  }

  ngOnInit() {
  }

}
