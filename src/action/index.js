import * as type from './type';
import * as http from '../axios/index';

export const requestData = category => ({
    type: type.REQUEST_DATA,
    category
});
export const receiveData = (data, category) => ({
    type: type.RECEIVE_DATA,
    payload:data,
    category
});
/**
 * 请求数据调用方法
 * @param funcName      请求接口的函数名
 * @param params        请求接口的参数
 */
export const fetchData = ({funcName, params, stateName}) => dispatch => {
    !stateName && (stateName = funcName);
    dispatch(requestData(stateName));
    return http[funcName](params).then(res => dispatch(receiveData(res, stateName)));
};

//模拟异步请求

export const asynData = () => {
    return (dispatch, getState) => {
        console.log("arison:开始执行异步函数asynData",getState());
        dispatch(requestData("appState"));
        setTimeout(() => {
            let data = {
                curDate: new Date().toString()
            };

            dispatch(receiveData(data, "appState"));
            console.log("arison:执行异步函数asynData结束",getState());
        }, 5000);
    }
};

// 异步 ACTION  示例
export const delayAdd = () => (dispatch, getState) =>　{
    dispatch(requestData("appState"));
    setTimeout(() => {
        let data = {
            curDate: new Date().toString()
        };
        console.log("arison:执行异步函数asynData结束");
        dispatch(receiveData(data, "appState"));
    }, 1000);
}


// export  const asynDataPromise=()=>{
//     // dispatch(requestData("appState"));
//     return new Promise((succ,err)=>{
//              setTimeout(()=>{
//                  let data = {
//                      curDate: new Date().toString()
//                  };
//                  succ(receiveData(data, "appState"));
//                      },5000);
//     })
// }