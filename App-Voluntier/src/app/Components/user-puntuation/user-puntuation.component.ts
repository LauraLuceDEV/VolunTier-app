import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'user-puntuation-component',
  templateUrl: './user-puntuation.component.html',
  styleUrls: ['./user-puntuation.component.scss'],
})
export class UserPuntuationComponent implements OnInit {
  @Input() userMediaScore: number;
  mediaScore: number;
  mediaScoreString : string;


  constructor() { }

  ngOnInit() {
    if(isNaN(this.userMediaScore)){
      this.mediaScore = 3;
    }else{
      this.mediaScore = Math.round(this.userMediaScore);
      this.mediaScoreString = this.userMediaScore.toFixed(1);
    }
  }

}
