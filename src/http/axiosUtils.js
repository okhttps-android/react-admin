import api from './interApi'
import React from 'react';
import { message} from 'antd';


export const sendGet = ({url, params, headers}) => { // get 请求

    return api.creatAxios1.get(url, params, headers)
        .then(res =>{
            if(res.code==0){

            }else if(0<res.code<1000){
                   message.error(res.message)
            }else{
                message.error(res.message)
            }
          return res.data
        })
        .catch(err => {
        console.log(err);
    });
}

export const sendPost = ({url, params, headers}) => { // post 请求
    return api.creatAxios1.post(url, params, headers)
        .then(res => {
            console.log("sendPost():",res);
        if(res.data.code==0){

        }else if(0<res.data.code<1000){
            message.error(JSON.stringify(res.data.message))
        }else{
            message.error(JSON.stringify(res.data.message))
        }
        return res.data
    }).catch(err => {
        console.log(err);
        message.error(JSON.stringify(err));
        if(err.code==500){
            message.error('服务器没有响应!');
        }

    });

}

export const sendAll = ({arr}) => { // 并发请求
    return new Promise((resolve, reject) => {
        api.sendAll(arr).then(res => {
            return resolve(res)
        })
    })
}

