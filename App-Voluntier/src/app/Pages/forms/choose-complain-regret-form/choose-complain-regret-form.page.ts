import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataItemModelsService } from 'src/app/Providers/data-item-model.service';

@Component({
  selector: 'app-choose-complain-regret-form',
  templateUrl: './choose-complain-regret-form.page.html',
  styleUrls: ['./choose-complain-regret-form.page.scss'],
})
export class ChooseComplainRegretFormPage implements OnInit {
  public taskID : string;

  //------------------------------
  // CICLO DE VIDA
  //------------------------------

  constructor(
    private dimService :DataItemModelsService,
    private router : Router,
    private actRoute : ActivatedRoute,
    private navCtrl : NavController,
  ) { }

  ngOnInit() {}

   // Nos carga los datos. Actualizamos los datos de la vista y posteriormente los pintamos en el Template.
   ionViewWillEnter(){
    console.log('ChooseComplainRegretFormPage IonviewWillEnter')
    this.chargeData();
  }

  //------------------------------
  // MÉTODOS
  //------------------------------

  chargeData() {
    this.taskID = this.actRoute.snapshot.paramMap.get('taskid');
  }


  // Para volver atrás
  goBackPage(){
    this.navCtrl.back();
  }

  goOnModeComplain(){
    this.dimService.setComplainOrRegretMode('complain');
    this.router.navigateByUrl(`/complain-regret-form/${this.dimService.getComplainOrRegretMode()}`);
  }

  goOnModeRegret(){
    this.dimService.setComplainOrRegretMode('regret');
    this.router.navigateByUrl(`/complain-regret-form/${this.dimService.getComplainOrRegretMode()}`);
  }
}
