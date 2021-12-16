import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoadingState } from 'src/app/Models/Globals';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  @Input() state: LoadingState.LOADING | LoadingState.ERROR | LoadingState.LOADED;
  @Output() retry = new EventEmitter<void>();

  retryRequest() {
    this.retry.emit();
  }

}
