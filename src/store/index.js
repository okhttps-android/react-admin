/**
 * Created by Arison on 2019/8/13.
 */
import {createStore, applyMiddleware} from 'redux'
import reducers from '../reducer/index'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
// import loggerMiddleware from 'redux-logger'

const middlewares=[
    thunkMiddleware,
    promiseMiddleware
]

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
const store = createStoreWithMiddleware(reducers)


// const store = createStore(
//     reducers,
//     applyMiddleware(thunkMiddleware)
// );

export default store