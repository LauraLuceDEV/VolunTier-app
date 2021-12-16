import { MapServiceService } from '../../Providers/map-service.service';
import { Component, OnInit } from '@angular/core';

declare var H: any;

/*Componente que a través de un servicio nos rellenará nuestro mapa*/
@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
})
export class HereMapComponent implements OnInit {
  constructor(private map: MapServiceService) { }

  ngOnInit() {
    this.map.buildMap();
  }

}
