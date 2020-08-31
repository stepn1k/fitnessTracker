import {AuthActions, eAuthActions} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
};

export function AuthReducer(state: State = initialState, action: AuthActions) {
  switch (action.type) {
    case eAuthActions.SetAuthenticated:
      return {
        isAuthenticated: true
      };
    case eAuthActions.SetUnauthenticated:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
