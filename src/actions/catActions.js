import * as types from './actionTypes'//i.e. import EVERYthing from the module into var `types`
import catApi from '../api/catApi'

/*Thunk will absorb the dispatch of the loadCats() f(n) so that it doesn Not
end up getting passed to the reducers.
The reducers will Only receive the normal Object actions.
*/


/*Action Creators for <CatPage>*****************for update()-ing********************/
export function loadCats() {
/*Be sure to have the store (located in `src/index.js`) dispatch the loadCats() f(n)*/
  return function(dispatch) {
    return catApi.getAllCats().then(cats => {
      dispatch(loadCatsSuccess(cats))
    }).catch(error => {
      throw(error)
    })
  }
  /*Because of Thunk, when we dispatch an action,
  we will have access to dispatch() As an Argument.
  cats = the payload
  */
}//close loadCats() action creator f(n)



//payload = cats
export function loadCatsSuccess(cats) { //loadCatSuccess() action creator
  return {type: types.LOAD_CATS_SUCCESS, cats}
}

//Action Creator f(n) which invokes updateCat() f(n) in catApi.js
export function updateCat(cat) {
  return function (dispatch) {
    return catApi.updateCat(cat).then(responseCat => { //on a successful of API request...
      dispatch(updateCatSuccess(responseCat))//..dispatch updateCatSuccess action (sending it the response)
    }).catch(error => {
      throw(error)
    })
  }
}

updateCatSuccess(cat) {
  return { type: types.UPDATE_CAT_SUCCESS, cat}
}


/*Action CREATors for <NewCatPage> container: *********  for create()-ing ************************************
They crate new actions for calling the cat Api**********************************************/

export function createCatSuccess(cat) {
  return { type: types.CREATE_CAT_SUCCESS, cat }
}

export function createCat(cat) {
  return function (dispatch) {
    return catApi.createCat(cat).then(responseCat => {
      dispatch(createCatSuccess(responseCat))
    }).catch(error => {
      throw(error)
    })
  }
}
