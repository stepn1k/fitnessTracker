import {eUIActions, UIActions} from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function UIReducer(state: State = initialState, action: UIActions) {
  switch (action.type) {
    case eUIActions.StartLoading:
      return {
        isLoading: true
      };
    case eUIActions.StopLoading:
      return {
        isLoading: false
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
