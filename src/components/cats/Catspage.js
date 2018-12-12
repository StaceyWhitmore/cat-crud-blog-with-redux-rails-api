import React, /*{ Component},*/ { PropTypes } from 'react'
import CatList from './CatList'
//import React from 'react'
//import PropTypes from 'prop-types'//no longer comes with React..I think
import * as catActions from '../../actions/catActions'//import all actions into catActions variable

//the container ("stateful") component <CatPage>
class CatsPage extends React.Component { //Not Cat(s)Page

  render() {
    //const cats = this.props.cats
    return (
      <div className="col-md-12">
        <h1>Cats</h1>
        <div className="col-md-4">
          <CatList cats={this.props.cats} />
        </div>
        <div className="col-md-8">
        {this.props.children}
        </div>
      </div>
    );
  }
}

CatsPage.propTypes = {
  cats: PropTypes.array.isRequired
}

/*mapStateToProps()'s purpose is:
receive application state from the store whenever state has changed and make
data from that data available to the component AS PROPS.*/
function mapStateToProps(state, ownProps) {
//e.g. state = {cats: [{id:1, name: "maru"}]}
  //this f(n) returns a new Obj. who's key:value pairs will become available
  //AS PROPS (and their values) in the <CatPage> component


  return {
    cats: state.cats
  };
}
//connect() subscribes the container component(CatPage)..
//..to the store, so that it will be alerted when state changes
/*Note: ONLY Container, or "Stateful", components will be connected to the store.*/
export default connect(mapStateToProps)(CatsPage)//connect == (to) subscribe (..to the store)

//Make sure CatsPage.cats is of type array and require that the component receives the property
//(otherwise, it will have nothing to render)
/*
CatsPage.propTypes = {
  cats: PropTypes.array.isRequired
}
*/
