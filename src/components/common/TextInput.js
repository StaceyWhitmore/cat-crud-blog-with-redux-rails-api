import React, { PropTypes } from 'react'
//import PropTypes from 'prop-types'

const TextInput = ({name, label, onChange, placeholder, value}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
        type="text"
        name={name}
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange} />
      </div>
    </div>
  );
}

//'PropTypes' or 'React.PropTypes' depends on which version of React is used
//Newer veresion of React require a separate 'prop-types' npm install and import
TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string
}

export default TextInput
