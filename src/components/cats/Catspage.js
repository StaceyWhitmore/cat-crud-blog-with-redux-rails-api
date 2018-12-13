import React, /*{ Component},*/ { PropTypes } from 'react'
import CatList from './CatList'
import NewCatPage from './NewCatPage'
//import React from 'react'
//import PropTypes from 'prop-types'//no longer comes with React..I think
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/catActions'//import all actions into catActions variable
import { Link, browserHistory } from 'react-router'


//the container ("stateful") component <CatPage>
class CatsPage extends React.Component { //Not Cat(s)Page
  componentWillMount() {
    if (this.props.cats[0].id == '') {
      this.props.actions.loadCats();
    }
  }
  render() {
    const cats = this.props.cats //for DRY purposes
    return (
      <div className="col-md-12">
        <h1>Cats
          <Link to={'/cats/new'} className="btn btn-primary">
            + a Cat
            </Link>
        </h1>
        <div className="col-md-4">
          <CatList cats={cats} />
        </div>
        <div className="col-md-8">
        {this.props.children}
        </div>
      </div>
    );
  }
}


/*mapStateToProps()'s purpose is:
receive application state from the store whenever state has changed and make
data from that data available to the component AS PROPS.*/
function mapStateToProps(state, ownProps) {
//e.g. state = {cats: [{id:1, name: "maru"}]}
  //this f(n) returns a new Obj. who's key:value pairs will become available
  //AS PROPS (and their values) in the <CatPage> component
  if (state.cats.length > 0) {
    return {
      cats: state.cats
    }
  } else {
    return {
      cats: [{id: '', name: '', breed: '', temperament: '', weight: '', hobbies: []}]
    }
  }
  return {
    cats: state.cats
  };
}//close mapStateToProps()

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

//connect() subscribes the container component(CatPage)..
//..to the store, so that it will be alerted when state changes
/*Note: ONLY Container, or "Stateful", components will be connected to the store.*/
export default connect(mapStateToProps, mapDispatchToProps)(CatsPage)//connect == (to) subscribe (..to the store)

//Make sure CatsPage.cats is of type array and require that the component receives the property
//(otherwise, it will have nothing to render)

CatsPage.propTypes = {
  cats: PropTypes.array.isRequired
}
