import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import HomePage from './components/home/HomePage'
import CatsPage from './components/cats/CatsPage'
import CatPage from './components/cats/CatPage'
import NewCatPage from './components/cats/NewCatPage'

//With this setup our app knows to respond to any requests Nested under the `/` root path with<App/> component.
//<IndexRoute component={HomePage}/> Sets the default Route to the <HomePage/> component
//Next, the `/cats` URL is mapped to the <CatsPage/> component
/*
<Route path="/cats/:id" component={CatPage}/>
maps the cats/:id route to the CatPage component,
*/
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/cats" component={CatsPage}>
      <Route path="/cats/new" component={NewCatPage} />
      <Route path="/cats/:id" component={CatPage} />
    </Route>
  </Route>
)
