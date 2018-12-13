import React, { PropTypes } from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as courseActions from '../../actions/catActions'
import CatForm from './CatForm'

class NewCatPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cat: {
        name: '',
        breed: '',
        weight: '',
        temperament: '',
        hobby_ids: []
      },
      saving: false
    }
    this.redirect         = this.redirect.bind(this)
    this.updateCatHobbies = this.updateCatHobbies.bind(this)
    this.updateCatState   = this.updateCatState.bind(this)
    this.saveCat          = this.saveCat.bind(this)


  }

  updateCatHobbies(event) {
    const cat = this.state.cat
    const hobbyId = event.target.value //target is the src of the event. It's value of this src element becomes the hobbyId
    const hobby = this.state.checkBoxHobbies.filter(hobby => {
      hobby.id == hobbyId
    })[0]//hobby[0] = hooby.id that matches the target of the event
    const checked = !hobby.checked //toggle .checked attr and store it in 'checked' var...
    /*obby['  ']*/hobby['checked'] = !hobby.checked//which becomes the key for accessing this val in the hobby[] array

    if (checked) { //if checked is true ...
      cat.hobby_ids.push(hobby.id)//..then add this hobby id to the hobby_ids[] array
    } else { //..otherwise (if it's UNchecked),
      //splice() mutates the original hobby_ids and returns every thing from hobby.id's index up...
      cat.hobby_ids.splice(cat.hobby_ids.indexOf(hobby.id))//what's left in hobby_ids[] are just those items below hobby.id (thanks a lot splice())
    }
    this.setState({cat: cat}) //last order of business-- update the state
  }//close updateCatHobbies()

  updateCatState(event) {
    const field = event.target.name
    const cat = this.state.cat
    cat[field] = event.target.value
    return this.setState({cat: cat})
  }

  saveCat(event) {
    event.preventDefault()
    //pass state to createCat()this time [instead of updateCat()]
    this.props.actions.createCat(this.state.cat)
  }




  render() {
    return (
      <div>
        <h1>New Cat</h1>
        <CatForm
          cat={this.state.cat}
          hobbies={this.props.checkBoxHobbies}
          onSave={this.saveCat}
          onChange={this.updateCatState}
          onHobbyChange={this.updateCatHobbies} />
      </div>

    );
  }

} //close <NewCatPage> Component class

function hobbiesForCheckBoxes(hobbies) {
  return hobbies.map( hobby => {
    hobby['checked'] = false //change that hobby's 'checked' attr to 'false'...
    return hobby//..and return it to the array of hobbies
  })
}

function mapStateToProps(state, ownProps) {
  let checkBoxHobbies = []
  if (state.hobbies.length > 0) {
    checkBoxHobbies = hobbiesForCheckBoxes(Object.assign([],
    state.hobbies))
  }

  return {
    checkBoxHobbies: checkBoxHobbies
  }
}

function mapDispatchToProps(dispatch) {
  //returns 'courseActions' instead of 'catActions'
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

NewCatPage.propTypes = {
  checkBoxHobbies: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCatPage)
