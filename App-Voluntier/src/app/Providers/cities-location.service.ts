import { Injectable } from '@angular/core';
import {DataCity, DataCoordinates} from '../Models/Clases/Extra_Clases';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {positionStackKey} from '../Models/Globals'


// Servicio que nos ayudará a localizar algunas ciudades en el mapa
@Injectable({
  providedIn: 'root'
})
export class CitiesLocationService {
  // API GeoDB Cities
  private hostEndPointGEODB = `http://geodb-free-service.wirefreethought.com`;
  // API PositionStack
  private hostEndPositionStack = `http://api.positionstack.com/v1/forward?access_key=${positionStackKey}`;

  constructor(private request: HttpClient) { }

  // Nos devuelve todas las ciudades que están cerca de la nuestra
  getCitiesNear(cityID): Observable<DataCity>{
    let url = `/v1/geo/cities/${cityID}/nearbyCities?limit=5&offset=0&radius=100`
    return this.request.get<DataCity>(this.hostEndPointGEODB + url);
  }

  // Nos sugiere ciudades a medida que vamos escribiendo
  getCitySuggest(cityCharacters: string): Observable<DataCity>{
    let url = `/v1/geo/cities?limit=5&offset=0&namePrefix=${cityCharacters}`
    return this.request.get<DataCity>(this.hostEndPointGEODB + url);
  }


  // Nos devuelve un booleano en el que nos dice si la ciudad existe o no
  existsCity(cityName: string): Observable<DataCity>{
    return this.getCitySuggest(cityName);
  }


  // Nos devuelve los datos de la ciudad actual
  getCurrentCityData(cityID: string){}

  // Nos devuelve los datos de la ciudad actual
  getCoordinatesFromAddress(address: string){
    let url = `${this.hostEndPositionStack}&query=${address}`
    return this.request.get<DataCoordinates>(url);}
  }
