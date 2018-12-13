import React, { PropTypes } from 'react'
//import PropTypes from 'prop-types'
import TextInput from '../common/TextInput'
import CheckBox from '../common/CheckBox'

class CatForm extends React.Component {
  constructor(props) {
    super(props)
    this.makeCheckBoxes = this.makeCheckBoxes.bind(this)
  }

  makeCheckBoxes() {
    return this.props.hobbies.map( hobby => {
      return (
        <CheckBox
          item={hobby}
          handleChange={this.props.onHobbyChange}
          key={hobby.id} />
      )
    })
  }

  render() {
    const boxes = this.makeCheckBoxes()
    return (
      <div>
        <form>
        <TextInput
          name="name"
          label="name"
          value={this.prop.cat.name}
          onChange={this.props.onChange} />

        {boxes}

        <TextInput
          name="breed"
          label="breed"
          value={this.props.cat.breed}
          onChange={this.props.onChange} />

        <TextInput
          name="weight"
          label="weight"
          value={this.props.cat.weight}
          onChange={this.props.onChange} />

        <TextInput
          name="temperament"
          label="temperament"
          value={this.props.cat.temperament}
          onChange={this.props.onChange} />

        <input
          type="submit"
          disabled={this.props.saving}
          className="btn btn-primary"
          onClick={this.props.onSave} />
        </form>
      </div>
    );
  }
}

//Remove 'React' from '.PropTypes'in new versions of React that require a separate 'prop-types' import
CatForm.propTypes = {
  cat: React.PropTypes.object.isRequired,
  hobbies: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onHobbyChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool
}

export default CatForm
