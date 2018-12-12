import React, { PropTypes } from 'react'
//import React from 'react'
//import { PropTypes } from 'prop-types'

const CatList = ({cats}) => {
  <ul className="list-group">
  {
    cats.map( cat =>
        <li className="list-group-item" key={cat.id}>
        {cat.name}
        </li>
     )
  }
  </ul>
}

CatList.propTypes = {
  cats: PropTypes.array.isRequired
}

export default CatList
