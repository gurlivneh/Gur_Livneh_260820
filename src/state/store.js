import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from '../state/reducer'

const reducers = combineReducers({
    reducer
})

export default createStore(reducers, applyMiddleware(thunk, logger));