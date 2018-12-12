import React, {PropTypes} from 'react';
//import PropTypes from 'prop-types'
import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import * as catActions from '../../actions/catActions';
import HobbyList from '../hobbies/HobbyList';
//import CatForm from './CatForm';
import {browserHistory} from 'react-router';

class CatPage extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      cat: this.props.cat,
      catHobbies: this.props.catHobbies,
      checkBoxHobbies: this.props.checkBoxHobbies,
      isEditing: false
    }
    this.updateCatState = this.updateCatState.bind(this)
    this.updateCatHobbies = this.updateCatHobbies.bind(this)
    //Add saveCat() method
    this.toggleEdit = this.toggleEdit.bind(this)

  }

updateCatHobbies(event) {
  const cat = this.state.cat
  const hobbyId = event.target.value
  const hobby = this.state.checkBoxHobbies.filter( hobby => hobby.id == hobbyId)[0]
  const checked = !hobby.checked
  hobby['checked'] = !hobby.checked

  if (checked) {
    //use .splice() method
  } else {
    //Finish this method then add saveCat() method
  }
}


  updateCatState(event) {
    const field = event.target.name
    const cat = this.state.catch
    cat[field] = event.target.value
    return this.setState({cat: cat})
  }

  //immediately invoked after mapStateToProps() nextProps = new props that will be passed to component
  componentWillReceiveProps(nextProps) {
    if (this.props.cat.id != nextProps.cat.id) {
      this.setState({cat: nextProps.cat})
    }
    if (this.props.checkBoxHobbies.length < nextProps.checkBoxHobbies.length) {
      this.setState({catHobbies: nextProps.catHobbies, checkBoxHobbies: nextProps.checkBoxHobbies})
    }
  }

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <h1>Edit Cat</h1>
          < cat form coming soon! />
        </div>
      )

    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.props.cat.name}</h1>
        <p>breed:{this.props.cat.breed}</p>
        <p>weight:{this.props.cat.weight}</p>
        <p>temperament:{this.props.cat.temperament}</p>
        <HobbyList hobbies={this.props.catHobbies}/>
      </div>
    );
  }
}//close class






//make sure the cat prop is an object and a required part of the <CatPage> component
CatPage.propTypes = {
  cat: PropTypes.object.isRequired,
  catHobbies: PropTypes.array.isRequired,
  checkBoxHobbies: PropTypes.array.isRequired
}

//a halper f(n) to extract the hobbies associated with hobby_id nums in hobby_ids[] array
function collectCatHobbies(hobbies, cat) {
  let selected = hobbies.map( hobby => {
    if (cat.hobby_ids.filter(hobby_id => hobbyId == hobby.id).length > 0) {
      return hobby
    }
  })
  return selected.filter( elem => elem != undefined)//return an array of all elements that are NOT undefined
}

function hobbiesForCheckBoxes(hobbies, cat=null) {
  return hobbies.map(hobby => {
    if (cat && cat.hobby_ids.filter( hobbyId => hobbyId === hobby.id).length > 0) {
      hobby['checked'] = true
    } else {
      hobby['checked'] = false
    }
    return hobby
  })
}

function mapStateToProps(state, ownProps) {
  const stateHobbies = Object.assign([], state.hobbies)
  let checBoxHobbies = []
  let catHobbies = []
  let cat = {name: '', breed: '', weight: '', temperment: '', hobby_ids: []}
  const catId = ownProps.params.id

  if (catId && state.cats.length > 0 && state.hobbies.length > 0) {
    cat = getCatById(state.cats, ownProps.params.id)
    if (cat.hobby_ids.length > 0) {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies, cat)
      catHobbies = collectCatHobbies(stateHobbies, cat)

  } else {
    checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies)
  }
}
  return {cat: cat, checBoxHobbies:checkBoxHobbies, catHobbies: catHobbies, }
  /*
  if (state.cats.length > 0) { //if the aSync call has returned and the API is ready...
    //...then, find the cat with the associated id
    cat = Object.assign({}, state.cats.find( cat => cat.id ===
      id))
  } //else..
  return {cat: cat}
  */
} //close mapStateToProps()

//Subscribe <CatPage> to the store
export default connect(mapStateToProps)(CatPage)
