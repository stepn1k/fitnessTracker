import {Component, OnInit} from '@angular/core';
import {TrainingService} from './training.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  onTrainingGoing = false;
  trainingSub: Subscription;


  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.trainingSub = this.trainingService.exerciseChanged
      .subscribe(exercise => this.onTrainingGoing = !!exercise);

  }


}
