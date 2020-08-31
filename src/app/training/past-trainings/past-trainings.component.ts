import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TrainingService} from '../training.service';
import {MatTableDataSource} from '@angular/material/table';
import {Exercise} from '../exercise.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {
  }

  ngOnInit(): void {
    this.store.select(fromTraining.getFinishedExercises)
      .subscribe(exercises => this.dataSource.data = exercises);
    this.trainingService.fetchFinishedExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
