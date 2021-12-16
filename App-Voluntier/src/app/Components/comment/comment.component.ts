import { Component, Input, OnInit } from '@angular/core';
import {Commentary} from '../../Models/Interfaces/AllInterfaces';

/*Componente que será la plantilla de los comentarios 
que apareceran en el perfil de los usuarios.

Usaremos la clase Comment para obtener todos los atributos de un comentario*/
@Component({
  selector: 'comment-component',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input('comment') comment: Commentary;
  valoration: string;
  // En esta variable almacenaremos los datos de los usuarios,
  // que han dejado comentarios/opiniones al correspondiente usuario proveniente de la base de datos
  constructor() {
   }

  // TODO: BORRAR. A través del input recuperar todos los datos desde la DB
  ngOnInit() {}

  
}
