//handles any and all cat related actions
import * as types from './actions/actionTypes'//import all the constants into variable:'types'
import initialState from './initialState'

export default function catReducer(state=initialState.cats, action) {
  switch(action.type) {
    case types.LOAD_CATS_SUCCESS:
      return action.cats //return NEW obj. w/ copies of all needed obj.s from prev state NEVER alter previous state
    default:
      return state
  }
}
//By returning action.cats (NEW copy of state) the previous cat collection is overwritten by new cat collection from API
