import {Action} from '@ngrx/store';

export enum eUIActions {
  StartLoading = '[UI] StartLoading',
  StopLoading = '[UI] StopLoading'
}

export class StartLoading implements Action {
  readonly type = eUIActions.StartLoading;
}

export class StopLoading implements Action {
  readonly type = eUIActions.StopLoading;
}

export type UIActions = StartLoading | StopLoading;
