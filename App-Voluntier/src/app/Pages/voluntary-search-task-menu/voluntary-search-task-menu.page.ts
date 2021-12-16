import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../Providers/database.service';
import { Observable } from 'rxjs/internal/Observable';
import { DataItemModelsService } from '../../Providers/data-item-model.service';
import { NavController } from '@ionic/angular';

// Página en la que el voluntario podrá realizar búsqueda de las tareas claseficadas por rango y tipo,
// así poder aceptar las más asequibles para él
@Component({
  selector: 'app-voluntary-search-task-menu',
  templateUrl: './voluntary-search-task-menu.page.html',
  styleUrls: ['./voluntary-search-task-menu.page.scss'],
})
export class VoluntarySearchTaskMenuPage implements OnInit, OnDestroy {
  public showFilterComponent: boolean;

  //Constructor
  constructor(private dbService: DatabaseService,
    private dimServ: DataItemModelsService,
    private navController: NavController) {
    this.dimServ.showTaskFilterMenu$.subscribe( (resp)=>{
      this.showFilterComponent = resp;
    } );
  }
  // OnInit
  ngOnInit() {
    console.log('')
    this.dbService.setTasksFilterCategories('');
    this.dbService.setTasksFilterCity('');
  }
  //OnDestroy
  ngOnDestroy(): void {
    this.dimServ.showTaskFilterMenu$.unsubscribe();
  }

  goBackPage(){
    this.navController.back();
  }

  // Evento del botón Filter que nos vuelte a mostrar el componente 'search-menu-filter'
  showFilterTemplateComponent(){
    this.dimServ.showTaskFilterMenu$.emit(true);
  }

}
