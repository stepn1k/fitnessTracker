import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Store} from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  onTrainingGoing$: Observable<boolean>;

  constructor(public store: Store<fromTraining.State>) {
  }

  ngOnInit(): void {
    this.onTrainingGoing$ = this.store.select(fromTraining.getIsTraining);
  }

}
