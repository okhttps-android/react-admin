/**
 * Created by Arison on 2019/9/10.
 */
import * as T from '../action/type';

const initialState = {
  testList: '',
};

const TestDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case T.GET_LIST_TEST:
      return {
        ...state,
        testList: action.data
      };
    default:
      return state;
  }
};

export default TestDataReducer;