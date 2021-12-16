import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Comment, Score } from 'src/app/Models/Clases/Extra_Clases';
import { userTypeVoluntary } from 'src/app/Models/Globals';
import { DatabaseService } from '../../Providers/database.service';

@Component({
  selector: 'profile-comments',
  templateUrl: './profile-comments.component.html',
  styleUrls: ['./profile-comments.component.scss'],
})
export class ProfileCommentsComponent implements OnInit {
  public comments: Comment[] = [];
  numberOfComments: number;
  @Output() numberOfCommentsEmitter = new EventEmitter<number>();

  // Obtendremos los comentarios de nuestra Base de Datos
  constructor(private dbServ: DatabaseService) {
    this.chargeData();

    // Mockeo de datos
    // this.dbServ.getCommentaries().subscribe( response => {
    //   this.comments = response;
    //   this.numberOfComments = response.length;
    //   this.numberOfCommentsEmitter.emit(this.numberOfComments);
    // }
    // );

   }

  ngOnInit() {}

  async chargeData(){
    const scores = await this.dbServ.getScores();

    for (const score of scores) {
      const userCommentDOC_ID = score.userCommentDOC_ID.trim();
      const userType = score.userType;

      let imgRoute = `../../../assets/img/`;
      let userName = '';
      let userSex = '';

      // Obtenemos el nombre del usuario y sexo
      if (userType === userTypeVoluntary){
        let pet = await this.dbServ.getPetitionerByDocID(userCommentDOC_ID);
        userName = pet.name;
        userSex = pet.sex;
      }else{
        let vol = await this.dbServ.getVoluntaryByDocID(userCommentDOC_ID)
        userName = vol.name;
        userSex = vol.sex;
      }

      // Obtenemos su imagen, sino tiene por defecto le añadiremos una
      if (userSex.toLowerCase() == 'male'){
        imgRoute += 'mas-user-icon.png';
      }else if(userSex.toLowerCase() == 'female'){
        imgRoute += 'fem-user-icon.png';
      }else{
        imgRoute += 'user-icon.png';
      }
      this.comments.push(new Comment(imgRoute, userName, score.userValoration, score.comment));
    }
  }

}
