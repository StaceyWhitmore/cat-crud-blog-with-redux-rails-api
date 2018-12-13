import React, {PropTypes} from 'react';
//import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as catActions from '../../actions/catActions';
import HobbyList from '../hobbies/HobbyList';
import CatForm from './CatForm';
import { browserHistory } from 'react-router';

class CatPage extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      cat: this.props.cat,
      catHobbies: this.props.catHobbies,
      checkBoxHobbies: this.props.checkBoxHobbies,
      isEditing: false
    }
    this.updateCatState   = this.updateCatState.bind(this)
    this.updateCatHobbies = this.updateCatHobbies.bind(this)
    this.toggleEdit       = this.toggleEdit.bind(this)
    this.saveCat          = this.saveCat.bind(this)
    this.deleteCat        = this.deleteCat.bind(this)
  }

  updateCatState(event) {
    const field = event.target.name
    const cat = this.state.cat
    cat[field] = event.target.value
    return this.setState({cat: cat})
  }

//This f(n) responds to the user checking or unchecking hobby checkboxes on the form
updateCatHobbies(event) {
  const cat = this.state.cat
  const hobbyId = event.target.value //target is the src of the event. It's value of this src element becomes the hobbyId
  const hobby = this.state.checkBoxHobbies.filter(hobby => hobby.id == hobbyId)[0]//hobby[0] = hooby.id that matches the target of the event
  const checked = !hobby.checked //toggle .checked attr and store it in 'checked' var...
  hobby['checked'] = !hobby.checked//which becomes the key for accessing this val in the hobby[] array
  if (checked) { //if checked is true ...
    cat.hobby_ids.push(hobby.id)//..then add this hobby id to the hobby_ids[] array
  } else { //..otherwise (if it's UNchecked),
    //splice() mutates the original hobby_ids and returns every thing from hobby.id's index up...
    cat.hobby_ids.splice(cat.hobby_ids.indexOf(hobby.id))//what's left in hobby_ids[] are just those items below hobby.id (thanks a lot splice())
  }
  this.setState({cat: cat}) //last order of business
}

  //this f(n) immediately invoked Every time a component's props are updated by a
  //re-invocation of the mapStateToProps() f(n)
  componentWillReceiveProps(nextProps) {
    // nextProps = new props that will be passed to component
    if (this.props.cat.id != nextProps.cat.id) { //If the cat.id being passed in is new and different than the current id...
      this.setState({cat: nextProps.cat})
    }
    if (this.props.checkBoxHobbies.length < nextProps.checkBoxHobbies.length) { //If the new props have a longer list of hobbies...
      //...then grab catHobbies and checkBoxHobbies from nextProps
      this.setState({catHobbies: nextProps.catHobbies, checkBoxHobbies: nextProps.checkBoxHobbies})
    }
  } //this method does nothing if props haven't changed

  toggleEdit() {
    this.setState({isEditing: !this.state.isEditing})
  }

  //The f(n) handles the submission of the CatForm
  saveCat(event) {
    event.preventDefault()
    this.props.actions.updateCat(this.state.cat)
  }

  deleteCat(event) {
    this.props.actions.deleteCat(this.state.cat)
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <h1>Edit Cat</h1>
          <CatForm
            cat={this.state.cat}
            hobbies={this.state.checkBoxHobbies}
            onSave={this.saveCat}
            onChange={this.updateCatState}
            onHobbyChange={this.updateCatHobbies}
          />
        </div>
      )

    }
    //change all occurences of 'props' to 'state' since state is now handled here
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.state.cat.name}</h1>
        <p>breed:{this.state.cat.breed}</p>
        <p>weight:{this.state.cat.weight}</p>
        <p>temperament:{this.state.cat.temperament}</p>
        <HobbyList hobbies={this.state.catHobbies}/>
        <button onClick={this.toggleEdit}
        className="btn btn-default">
          edit
        </button>
        <button
         onClick={this.deleteCat}
         className="btn btn-default"
         name="button">
        delete
       </button>
      </div>
    );
  }
}//close component class-- <CatPage>




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
    if (cat.id && cat.hobby_ids.length > 0) {
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
} //Now that this method has been invoked; NEXT, componentWillReceiveProps() will be invoked immediately with nextProps

/*The bindActionCreators() f(n) takes the action creator f(n)'s object & wraps
Each action creator f(n) in a call to .dispatch().
This produces a new object with keys that point to our actions, but, since Each
action creator was wrapped in .dispatch(), we can now invoke actions directly.*/
mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(catActions, dispatch)
  };
}

//make sure the cat prop is an object and a required part of the <CatPage> component
CatPage.propTypes = {
  cat: PropTypes.object.isRequired,
  catHobbies: PropTypes.array.isRequired,
  checkBoxHobbies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

//connect() subscribes <CatPage> to the store & hooks into the mapStateToProps() f(n)
export default connect(mapStateToProps, mapDispatchToProps)(CatPage)
