import api from './interApi'
import React from 'react';
import { message} from 'antd';
import { Toast } from 'antd-mobile';

export const sendGet = ({url, params, headers}) => { // get 请求
    let user=localStorage.getItem("user");
    if(user!=null){
        user=JSON.parse(user);
        headers={
           headers:{
               "agent-id":user.data.agent.id,
               "agent-token": user.data.access_token.token,
           },
            params:params
        }
    }
    return api.creatAxios1.get(url, headers)
        .then(res =>{
            if(res.data.code==0){

            }else if(0<res.data.code<1000){
                if(res.data.code==403){
                    message.error("登陆已过期，请重新登陆")
                }else{
                    message.error(JSON.stringify(res.data.message))
                }
            }else{
                message.error(res.data.message)
            }
          return res.data
        })
        .catch(err => {
        console.log(err);
    });
}

export const sendPost = ({url, params, headers}) => { // post 请求
    Toast.loading("")
    let user=localStorage.getItem("user");
    if(user!=null){
        user=JSON.parse(user);
        headers={
            headers:{
                "agent-id":user.data.agent.id,
                "agent-token": user.data.access_token.token,
            }
        }
    }
    return api.creatAxios1.post(url, params, headers)
        .then(res => {
            Toast.hide();
            console.log("sendPost():",res);
        if(res.data.code==0){
        }else if(0<res.data.code<1000){
            if(res.data.code==403){
                message.error("登陆已过期，请重新登陆55")
            }else{
                message.error(JSON.stringify(res.data.message))
            }
        }else{
            message.error(JSON.stringify(res.data.message))
        }
        return res.data
    }).catch(err => {
         Toast.hide();
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

