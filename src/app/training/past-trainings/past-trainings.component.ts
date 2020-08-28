import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TrainingService} from '../training.service';
import {MatTableDataSource} from '@angular/material/table';
import {Exercise} from '../exercise.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  dataSubscription: Subscription;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit(): void {
    this.dataSubscription =
      this.trainingService.finishedExercisesChanged.subscribe(exercises => {
        this.dataSource.data = exercises;
      });

    this.trainingService.fetchFinishedExercises();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
