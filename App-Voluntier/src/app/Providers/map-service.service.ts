import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = `mapbox://styles/mapbox/streets-v11`;
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 43.1746;
  lng = -2.4125;
  zoom = 15;


  constructor() {
    // Asignamos el token desde las variables de entorno
    this.mapbox.accessToken = environment.mapBoxToken;
  }

  // Nos construye el mapa por defecto
  buildMap() {
    if(this.map != null){
      this.map.remove();
    }
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat]
    });

    this.map.on('load', () => {
      this.map.resize();
    });
    new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(this.map);
      // Add the control to the map.
    this.map.addControl(
      new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      })
    );

    console.log("adControlMap");
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  // Mapa con coordinadas
  buildMapParams(lat, long) {
    this.lng = long;
    this.lat = lat;

    if(this.map != null){
      this.map.remove();
    }

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });

    this.map.on('load', () => {
      this.map.resize();
    });

    // // Create a default Marker and add it to the map.
    new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(this.map);
  }
}
