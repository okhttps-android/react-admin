/**
 * Created by Arison on 2019/8/13.
 */
import {createStore, applyMiddleware} from 'redux'
import AppReducers from '../reducer'
import thunkMiddleware from 'redux-thunk'
// import loggerMiddleware from 'redux-logger'

const middlewares=[
    thunkMiddleware
]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
const store = createStoreWithMiddleware(AppReducers)

export default store