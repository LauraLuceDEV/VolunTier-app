import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';


// Servicio que nos permite coger nuestros archivos de la base de datos de FireBase
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  //Tarea para subir archivo
  public async uploadImage(file: File): Promise<AngularFireUploadTask> {
    const filePath = file.name;
    // Crea una referencia de acceso
    const fileRef = this.storage.ref(filePath);
    return fileRef.put(file);
  }

  //Referencia del archivo
  public async getImage(fileName: string): Promise<string> {
    return this.storage.ref(fileName).getDownloadURL().toPromise();

  }
}
