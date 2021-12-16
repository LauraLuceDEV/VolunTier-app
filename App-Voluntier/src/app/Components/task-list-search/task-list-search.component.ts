import { Component, OnDestroy, OnInit, OnChanges } from '@angular/core';
import { Task} from '../../Models/Clases/Extra_Clases';
import { from as fromPromise, Observable } from 'rxjs';
import { DatabaseService } from 'src/app/Providers/database.service';
import { Router } from '@angular/router';
import { CitiesLocationService } from '../../Providers/cities-location.service';
import { Voluntary } from '../../Models/Clases/Voluntary';
import { LoadingState } from 'src/app/Models/Globals';

@Component({
  selector: 'task-list-search',
  templateUrl: './task-list-search.component.html',
  styleUrls: ['./task-list-search.component.scss'],
})
export class TaskListSearchComponent implements OnInit, OnChanges, OnDestroy{
  petitionerTasks: Observable<Task[]>;
  state: LoadingState = LoadingState.LOADING;

  //--------------------
  // CICLO DE VIDA DEL COMPONENTE
  //--------------------
  constructor(private databaseService: DatabaseService,
    private cityserv: CitiesLocationService,
    private router: Router) { }

  // Nos cargará todas las tareas
  // Tanto de la ciudad del Voluntario como de las ciudades cercanas
  ngOnInit() {
    console.log(' onInit')
    this.loadData();
  }


  ngOnChanges(){
    console.log('ngOnChanges');
    this.loadData();
  }

  ngOnDestroy(){
    console.log('ngOnDestroy')
    this.databaseService.taskRefresher$.unsubscribe();
    this.petitionerTasks.subscribe().unsubscribe();
    this.databaseService.taskRefresher$.unsubscribe();
    this.cityserv.getCitiesNear('').subscribe().unsubscribe();
  }


  //--------------------
  // MÉTODOS DEL COMPONENTE
  //--------------------

  // Nos lleva a la página de las tareas para que el voluntario pueda visualizarla con más detalles
  goToTaskDetails(taskID, taskPetitionerDOC_ID){
    console.log(taskPetitionerDOC_ID)
    this.router.navigateByUrl(`/task-details/${taskID}/${taskPetitionerDOC_ID}`);
  }

  // nos carga todos los datos de la página
  loadData() {
    // Observable que nos ayudará a actualizar el listado a la hora de filtrar las tareas
    this.databaseService.taskRefresher$.subscribe( (taskFilterResp) => {

      if(taskFilterResp == 'search-by-city'){
        this.petitionerTasks = fromPromise(this.databaseService.getTasksVoluntaryCity());
      }else if(taskFilterResp == 'search-by-category'){
        this.petitionerTasks = fromPromise(this.databaseService.getTasksByCategories());
      }else{
        this.loadTasks();
      }
    });
    this.databaseService.taskRefresher$.emit('');
  }

  // Nos carga las tareas
  async loadTasks() {
    // Obtenemos los datos del voluntario
    const vol: Voluntary = await this.databaseService.getProfileVoluntary() as Voluntary;

    // Obtenemos los datos de la ciudad
    this.cityserv.getCitySuggest(vol.getAddress().city).subscribe((dataCities=>{
      // Obtenemos las ciudades que hay alrededor de la del Voluntario
      this.cityserv.getCitiesNear(dataCities.data[0].id).subscribe((resp)=>{

        let cityNames: string[] = [];
        resp.data.forEach(element =>{
          cityNames.push(element.city)
        })
        cityNames.unshift(vol.getAddress().city);
        this.petitionerTasks = fromPromise(this.databaseService.getTasksNearVoluntaryCity(cityNames));

        this.state = LoadingState.LOADED;
      })
     }));
  }

}

