import { combineReducers } from 'redux';
import  httpData from './HttpDataReducer'
import asynData from "./AsynDataReducer"
import testData from "./TestDataReducer"




const reducers = combineReducers({ httpData,asynData,testData})
export default reducers