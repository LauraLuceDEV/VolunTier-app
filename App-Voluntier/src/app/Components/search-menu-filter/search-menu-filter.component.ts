import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { TaskCategories } from 'src/app/Models/Globals';
import { CitiesLocationService } from 'src/app/Providers/cities-location.service';
import { DatabaseService } from '../../Providers/database.service';
import { ToastController } from '@ionic/angular';
import { DataCity } from '../../Models/Clases/Extra_Clases';
import { DataItemModelsService } from '../../Providers/data-item-model.service';

@Component({
  selector: 'search-menu-filter',
  templateUrl: './search-menu-filter.component.html',
  styleUrls: ['./search-menu-filter.component.scss'],
})
export class SearchMenuFilterComponent implements OnInit, OnChanges {
  public taskCategories;      // Atributo para guardar las categorías de la variable global
  public citySuggest;         // Atributo para guardar la sugerencia de la ciudad que se esta introduciendo manualmente
  private voluntaryCity: string;// Atributo para obtener la ciudad del voluntario
  public dataCity: DataCity;    // Atributo para guardar los datos de la API de la ciudad que necesitemos


  //--------------------
  // CICLO DE VIDA DEL COMPONENTE
  //--------------------
  // constructor
  constructor(private cityService :CitiesLocationService,
    private toastController: ToastController,
    private dbService: DatabaseService,
    private dimServ: DataItemModelsService) {
      // this.loadData();
    }

  ngOnInit() {
    console.log('ngOnInit');
    this.loadData();
  }

  ngOnChanges(){
    console.log('ngOnChanges');
    this.loadData();
  }


  // // Nos limpia las vistas
  // ngOnDestroy(){
  //   console.log('ngOnDestroy');
  //   this.dbService.setTasksFilterCity('');
  //   this.dbService.setTasksFilterCategories('');
  //   this.cityService.getCitySuggest(this.voluntaryCity).subscribe().unsubscribe();
  // }

  //--------------------
  // MÉTODOS DEL COMPONENTE
  //--------------------

  // nos carga todos los datos del componente
  async loadData() {
    console.log('loadData')
    this.taskCategories = TaskCategories;
    this.citySuggest = 'Write your city';

    //Obtenemos la ciudad del voluntario predeterminada
    this.voluntaryCity = (await (this.dbService.getProfileVoluntary())) .getAddress().city;

    if(this.voluntaryCity == undefined || this.voluntaryCity == null) {
      this.voluntaryCity = 'Madrid';

      console.log(this.taskCategories)
      console.log(this.voluntaryCity)
    }
    // this.dbService.getProfileVoluntary()
    // .then((resp)=>{
    //   this.voluntaryCity = resp.getAddress().city;
    // }).catch((err)=>{
    //     console.log(err);
    //     this.voluntaryCity = 'Madrid';
    //   }
    // );
  }

  // A medida que escribimos en el input del nombre de la ciudad
  //nos realiza una petición
  inputChange(event: any) {
    this.cityService.getCitySuggest(event.target.value).subscribe((resp)=>{
      this.citySuggest = resp.data[0].city;
    }).unsubscribe();
 }


  //Opción de filtrar tareas
  searchTasks(taskCategory: string, cityName: string){
    console.log('searchTasks')
    // Búsqueda sólo por ciudad
    if(taskCategory == undefined && cityName.length >= 1){
      // comprobamos si existe la ciudad
      this.cityService.getCitySuggest(cityName).subscribe((resp)=>{
        let existsCity = false;

        resp.data.forEach(cityGPS =>{
          if(cityGPS.city.toLocaleLowerCase() == cityName.toLocaleLowerCase()){
            existsCity = true;
          }
        });

        cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

        if(existsCity){
          this.searchByCity(cityName)

        }else{
          // Nos busca sólo las tareas de la ciudad predeterminada del voluntario
          this.toastNonExistentCity(cityName)
          this.searchByCity(this.voluntaryCity)
        }
      })
      // Búsqueda por categorías
    }else if(taskCategory != undefined){
      if(cityName.length != undefined || cityName.length >= 1){
        this.searchByCategory(taskCategory, cityName);
      }else{
        this.searchByCategory(taskCategory, this.voluntaryCity);
      }
    }
    // Búsqueda sin filtrar
    else{
      this.searchWithoutFilter();
    }
  }

  // Emite los valores para buscar las tareas de la ciudad predeterminada
  searchByCity(cityName: string) {
    this.dbService.setTasksFilterCity(cityName);
    this.dbService.taskRefresher$.emit('search-by-city');
    this.hideSearchTaskMenuComponent();
  }

  // Emite los valores para buscar las tareas filtradas por categoría
  searchByCategory(taskCategory: string, city: string) {
    this.dbService.setTasksFilterCategories(taskCategory);
    if(city != undefined || city.length <= 0){
      this.dbService.setTasksFilterCity(city);
    }
    this.dbService.taskRefresher$.emit('search-by-category');

    this.hideSearchTaskMenuComponent();
  }

  // Emite los valores para buscar las tareas sin filtrar
  searchWithoutFilter() {
    this.dbService.setTasksFilterCategories('');
    this.dbService.setTasksFilterCity('');
    this.dbService.taskRefresher$.emit('');

    this.hideSearchTaskMenuComponent();
  }

  // Nos oculta el componente 'search-menu-filter' para tener mejor visualización de las tareas
  hideSearchTaskMenuComponent() {
    this.dimServ.showTaskFilterMenu$.emit(false);
  }

 // Nos informará con un toast que la ciudad que se ha insertado no existe
  async toastNonExistentCity(voluntaryCity: string) {
    const toast = await this.toastController.create({
      message: voluntaryCity + " does not exists as a city",
      position: 'bottom',
      duration: 2000,
      cssClass: 'customToastClass'
    });
    toast.present();
  }


}


