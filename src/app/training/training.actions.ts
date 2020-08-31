import {Action} from '@ngrx/store';
import {Exercise} from './exercise.model';

export enum eTrainingActions {
  SetAvailableExercises = '[Training] Set Available Exercises',
  SetFinishedExercises = '[Training] Set Finished Exercises',
  StartTraining = '[Training] Start Training',
  StopTraining = '[Training] Stop Training'
}

export class SetAvailableExercises implements Action {
  readonly type = eTrainingActions.SetAvailableExercises;

  constructor(public payload: Exercise[]) {
  }
}

export class SetFinishedExercises implements Action {
  readonly type = eTrainingActions.SetFinishedExercises;

  constructor(public payload: Exercise[]) {
  }
}

export class StartTraining implements Action {
  readonly type = eTrainingActions.StartTraining;

  constructor(public payload: string) {
  }
}


export class StopTraining implements Action {
  readonly type = eTrainingActions.StopTraining;
}

export type TrainingActions = SetAvailableExercises | SetFinishedExercises | StartTraining | StopTraining;
