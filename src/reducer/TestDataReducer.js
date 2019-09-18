/**
 * Created by Arison on 2019/9/10.
 */
import * as T from '../action/type';
import { handleAction } from 'redux-actions';
import { handleActions } from 'redux-actions';

const initialState = {
  testList: [],
};

// const TestDataReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case T.GET_LIST_TEST:
//       return {
//         ...state,
//         testList: action.payload
//       };
//     default:
//       return state;
//   }
// };

// const TestDataReducer=handleAction(T.GET_LIST_TEST,(state,action)=>{
//   return {
//       ...state,
//       testList: action.payload
//   }
// },initialState);

//
const TestDataReducer=handleActions({
    [T.GET_LIST_TEST]:(state,action)=>{
       return {
           ...state,
           testList:action.payload
       }
    },
    [T.TEST_DELETE]:(state,action)=>{
       return {
           ...state,
           testList:state.testList.filter(l => l.id !== action.payload.id),
       }
    }
},initialState)

export default TestDataReducer;