//handles any and all cat related actions
import * as types from '../actions/actionTypes'//import all the constants into variable:'types'
import initialState from './initialState'
import { browserHistory } from 'react-router'

//remember to tell the app to "redirect" to that new cat's show page.
export default function catReducer(state=initialState.cats, action) {
  switch(action.type) {
    case types.LOAD_CATS_SUCCESS:
      return action.cats //return NEW obj. w/ copies of all needed obj.s from prev state NEVER alter previous state
    case types.CREATE_CAT_SUCCESS:
      browserHistory.push(`/cats/${action.cat.id}`)
      return [
        ...state.filter( cat => cat.id !== action.cat.id ),
        Object.assign({}, action.cat)
      ]
    case types.DELETE_CAT_SUCCESS: {
      const newState = Object.assign([], state) //creates a new copy of App state...
      const indexOfCatToDelete = state.findIndex(cat => { //...with
        return cat.id == action.cat.id //...the cat to delete
      })
      newState.splice(indexOfCatToDelete, 1)//...removed
      browserHistory.push('/cats')
      return newState//...and returns this new state with cat (corresponding to action.cat.id) removed
    }
    case types.UPDATE_CAT_SUCCESS:
      return [
        ...state.filter(cat => cat.id !== action.cat.id), //create a new copy of stat with a New...
        Object.assign({}, action.cat)//...updated copy of the relevant cat
      ]
      /* UPDATE_CAT_SUCCESS
       This New state will trigger a re-invocation of mapStateToProps()
       which will trigger a re-render of <CatPage>, thus CatPage is re-rendered
       with all the updated cat info
      */
    default:
      return state
  }//close switch (action.type) {}

}//close catReducer(state, action) ---> the new state
//By returning action.cats (NEW copy of state) the previous cat collection is overwritten by new cat collection from API
