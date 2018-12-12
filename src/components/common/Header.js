import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

//Header contains `Home` and `Cats` links
const Header = () => {
  return (
    <nav>
      <IndexLink to="/"
      activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/cats" activeClassName="active">Cats</Link>
    </nav>
  )
}

export default Header
