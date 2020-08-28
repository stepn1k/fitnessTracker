import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {NgForm} from '@angular/forms';
import {Exercise} from '../exercise.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  public exercisesList: Exercise[];
  public exercisesSub: Subscription;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exercisesSub = this.trainingService.exercisesChanged
      .subscribe(exercises => (this.exercisesList = exercises));
  }

  ngOnDestroy() {
    this.exercisesSub.unsubscribe();
  }

  onTrainingStart(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

}
