import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {Exercise} from '../exercise.model';
import {Observable} from 'rxjs';
import * as fromTraining from '../training.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  public exercisesList$: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    public store: Store<fromTraining.State>
  ) {
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exercisesList$ = this.store.select(fromTraining.getAvailableExercises);
  }

  onTrainingStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
