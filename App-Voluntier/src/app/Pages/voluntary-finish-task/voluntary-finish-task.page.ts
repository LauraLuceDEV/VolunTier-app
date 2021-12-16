import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataItemModelsService } from '../../Providers/data-item-model.service';

@Component({
  selector: 'app-voluntary-finish-task',
  templateUrl: './voluntary-finish-task.page.html',
  styleUrls: ['./voluntary-finish-task.page.scss'],
})
export class VoluntaryFinishTaskPage implements OnInit {
  public taskID : string = "";

  constructor(private router: Router,
    private dimService: DataItemModelsService,
    private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.taskID = this.actRoute.snapshot.paramMap.get('taskid');
  }

  // MÉTODOS

  // Nos lleva al formulario de puntuaciones/comentarios
  leaveACommentToPetitioner(){
    this.router.navigateByUrl(`/score-form/${this.taskID}`);
  }

  // Nos lleva al formulario de quejas
  leaveAComplain(){
    this.dimService.setComplainOrRegretMode("complain");
    console.log(this.taskID);
    this.router.navigateByUrl(`/complain-regret-form/${this.taskID}`);
  }

  // Nos lleva de nuevo a nuestro perfil
  returnToMyProfile(){
    this.router.navigateByUrl('user-profile');
  }

}
