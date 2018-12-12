import * as types from './actionTypes'//i.e. import EVERYthing from the module into var `types`
import catApi from '../api/catApi'

/*Thunk will absorb the dispatch of the loadCats() f(n) so that it doesn Not
end up getting passed to the reducers.
The reducers will Only receive the normal Object actions.
*/


/*Be sure to have the store (located in `src/index.js`) dispatch the
loadCats() f(n)*/
export function loadCats() {
  /*Because of Thunk, when we dispatch an action,
  we will have access to dispatch() As an Argument.
  cats = the payload
  */
  return function(dispatch) {
    return catApi.getAllCats().then(cats => {
      dispatch(loadCatsSuccess(cats))
    }).catch(error => {
      throw(error)
    })
  }
}//close loadCats() action creator f(n)



//payload = cats
export function loadCatsSuccess(cats) { //loadCatSuccess() action creator
  return {type: types.LOAD_CATS_SUCCESS, cats}
}
