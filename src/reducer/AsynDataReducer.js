
import * as type from '../action/type';

const handleData = (state = {isFetching: true, data: {}}, action) => {
    switch (action.type) {
        case type.REQUEST_DATA:
            return {...state, isFetching: true};
        case type.RECEIVE_DATA:
            return {...state, isFetching: false, data: action.payload};
        default:
            return {...state};
    }
};
//模拟异步Action
const asynData = (state = {}, action={}) => {
    const  {meta={}}=action;
    const  {category={}}=meta;
    switch (action.type) {
        case type.RECEIVE_DATA:
        case type.REQUEST_DATA:
            return {
                ...state, [category]: handleData(state[category], action)
            };
        default:
            return {...state};
    }
};

export default asynData