import api from './interApi'
import config from './api.config'
import React from 'react';
import { message} from 'antd';

function _apiFn(baseUrl) { // 该方法对外不可见
    if (baseUrl === 'service2') {
        api.creatAxios1.defaults.baseURL = config.SERVER_URL2 // 改变 axios 实例的 baseURL
    } else if (baseUrl === 'service3') {
        api.creatAxios1.defaults.baseURL = config.SERVER_URL3
    } else {
        api.creatAxios1.defaults.baseURL = config.SERVER_URL1
    }
}

export const sendGet = ({url, params, headers}) => { // get 请求
    return api.creatAxios1.get(url, params, headers).then(res => res.data).catch(err => {
        console.log(err);
    });
}

export const sendPost = ({url, params, headers}) => { // post 请求
    return api.creatAxios1.post(url, params, headers).then(res => res.data).catch(err => {
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

