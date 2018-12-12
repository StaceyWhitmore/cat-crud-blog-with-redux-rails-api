

/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
/*browserHistory is the recommended history for URL manipulation with React Router,
allowing us to build semantic URLs that look like /cats/new or cats/7*/
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import loadCats from './actions/catActions'
import loadHobbies from './hobbyActions'

const store = configureStore()//invoking our method creates the store here.
//Make sure the cats are loaded up from the API for browsing right away.
store.dispatch(loadCats())//loadCats() will make the API call and, in turn, dispatch another f(n)
store.dispatch(loadHobbies())//in turn dispatches .then(hobbies => distpatch(loadHobbiesSuccess(hobbies)) ) 

//use the Redux Provider to make the store available to any components
//we need to connect to it.
ReactDOM.render(
 <Provider store={store}>
  <Router history={browserHistory} routes={routes} />
 </Provider>,
  document.getElementById('app')
)

/*
The App state/data flow is as follows:
action dispatch -> API call -> action dispatch -> store -> reducer -> re-render component
*/
