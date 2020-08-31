import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {TrainingComponent} from './training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {TrainingRoutingModule} from './training-routing.module';
import {AuthGuard} from '../auth/auth.guard';
import {StoreModule} from '@ngrx/store';
import {TrainingReducer} from './training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', TrainingReducer)
  ],
  providers: [AuthGuard],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {
}
