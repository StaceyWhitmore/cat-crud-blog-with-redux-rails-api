//This is the root (top-most) component responsible for 2 things:
//First, it will render a simple Header component (defined in src/common/Header.js)
//Second, (beneath that first Header) it will render all it's children

import React, { PropTypes } from 'react';
import Header from './common/Header';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
      <Header />
      {this.props.children}
      </div>
    )
  }
}

//make sure this App's children property is of type 'object' and required
App.propTypes = {
  children: PropTypes.object.isRequired
}

export default App
