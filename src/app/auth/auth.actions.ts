import {Action} from '@ngrx/store';

export enum eAuthActions {
  SetAuthenticated = '[Auth] Set Authenticated',
  SetUnauthenticated = '[Auth] Set Unauthenticated'
}

export class SetAuthenticated implements Action {
  readonly type = eAuthActions.SetAuthenticated;
}

export class SetUnauthenticated implements Action {
  readonly type = eAuthActions.SetUnauthenticated;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;
