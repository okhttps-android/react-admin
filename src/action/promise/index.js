/**
 * Created by Arison on 2019/9/18.
 */
import { createAction } from 'redux-actions';
import type from "../type";

// export const receiveData = (data, category) => ({
//     type: type.RECEIVE_DATA,
//     data,
//     category
// });

export const receiveData =createAction(type.RECEIVE_DATA,(data, category)=>{
    return data;
});

export const asynDataPromiseAction=createAction(type.RECEIVE_DATA,()=>{
    return new Promise((succ,err)=>{
        setTimeout(()=>{
            let data = {
                curDate: new Date().toString()
            };
            succ(receiveData(data, "appState"));
        },5000);
    })
});

export  const asynDataPromise=()=>{
    // dispatch(requestData("appState"));
    return new Promise((succ,err)=>{
        setTimeout(()=>{
            let data = {
                curDate: new Date().toString()
            };
            succ(receiveData(data, "appState"));
        },5000);
    })
}