import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state=initialState.hobbies, action) {
  switch(action.type) {
    case LOAD_HOBBIES_SUCCES:
      return action.hobbies
    default:
      return state
  }
}
