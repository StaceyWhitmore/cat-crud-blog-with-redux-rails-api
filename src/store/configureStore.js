import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer'//the rootReducer wraps all the reducers into one
import thunk from 'redux-thunk' //so we can `applyMiddleware(thunk)`
//the Thunk middleware, which will allow us to construct our action creators in a very special way
//Without Thunk (or a similar library) the dispatch() f(n) is Only available
// to be called on our store instance (like so `store.dispatch()`) and Not anything else.


//configureStore() creates and returns a
 //store integrating rootReducer and the thunk middleware
export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  )
}
