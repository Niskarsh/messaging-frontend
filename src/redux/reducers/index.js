import { combineReducers } from 'redux'
import { oAuthReducer } from './oAuthToken'

const globalReducer = combineReducers ({authToken : oAuthReducer})

export default globalReducer