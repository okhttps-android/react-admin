/**
 * Created by Arison on 2019/9/18.
 */
import {createAction} from 'redux-actions';
import type from "../type";
import {getTestListOrigin} from "../test/index";
import {receiveData} from "../index";


// export const receiveData = (data, category) => ({
//     type: type.RECEIVE_DATA,
//     payload:data,
// });

// export const receiveData =createAction(type.RECEIVE_DATA,(data, category)=>{
//     return data;
// });

//用了createAction的，promise函数内部succ执行的就不再要求是action了，是对象就可以。
export const asynDataPromiseAction = createAction(type.GET_LIST_TEST, () => {
    return new Promise((succ, err) => {
        const testList=[
            {
                id:'1',
                name:'test1',
                description: 'test1-description',
            },
            {
                id:'2',
                name:'test2',
                description: 'test2-description',
            }
        ]
        setTimeout(() => {
            succ(testList);
        }, 1000);
    })
});

export const sendAsynPromise=(category)=>{
    return {
        type: type.RECEIVE_DATA,
        payload: asynDataPromise(),
        meta:{ category: category }
    }
}
//没有用createAction的，promise函数内部succ执行的对象必须是action
export const asynDataPromise = () => {
    // dispatch(requestData("appState"));
    return new Promise((succ, err) => {
        setTimeout(() => {
            let data = {
                curDate: new Date().toString()
            };
            succ(receiveData(data, "appState"));
        }, 1000);
    })
}