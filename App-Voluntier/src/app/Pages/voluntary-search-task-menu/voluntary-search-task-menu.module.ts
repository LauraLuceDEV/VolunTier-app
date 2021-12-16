
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VoluntarySearchTaskMenuPageRoutingModule } from './voluntary-search-task-menu-routing.module';
import { VoluntarySearchTaskMenuPage } from './voluntary-search-task-menu.page';

// Componentes de la página
import { TaskListSearchComponent } from 'src/app/Components/task-list-search/task-list-search.component';
import { SearchMenuFilterComponent } from 'src/app/Components/search-menu-filter/search-menu-filter.component';
import { LoadingComponent } from 'src/app/Components/loading/loading.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoluntarySearchTaskMenuPageRoutingModule
  ],
  // Importamos los componentes de la página
  declarations: [VoluntarySearchTaskMenuPage, TaskListSearchComponent, SearchMenuFilterComponent, LoadingComponent]
})
export class VoluntarySearchTaskMenuPageModule {}
