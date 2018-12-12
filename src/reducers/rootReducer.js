import { combineReducers } from 'redux'
import cats from './catReducer'
import hobbies from './hobbyReducer'

const rootReducer = combineReducers({
  cats, //short hand property name instead of typing out `cats: cats`
  hobbies
})

export default rootReducer
