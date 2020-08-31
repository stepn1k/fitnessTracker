import {Exercise} from './exercise.model';
import * as fromRoot from '../app.reducer';
import {eTrainingActions, TrainingActions} from './training.actions';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  currentExercise: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    currentExercise: null
  }
;

export function TrainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case eTrainingActions.SetAvailableExercises:
      return {
        ...state,
        availableExercises: action.payload
      };
    case eTrainingActions.SetFinishedExercises:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case eTrainingActions.StartTraining:
      return {
        ...state,
        currentExercise: {...state.availableExercises.find(el => el.id === action.payload)}
      };
    case
    eTrainingActions.StopTraining:
      return {
        ...state,
        currentExercise: null
      };
    default:
      return state;
  }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getCurrentExercise = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.currentExercise != null);

