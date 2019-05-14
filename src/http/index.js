import {sendGet, sendPost} from './axiosUtils'
import {API} from './api.config'

export const limit=10000
//limit=10&offset=10
//代理接口
export const login = ({username,password}) => sendPost({
    url: API.APP_LOGIN,
    params: {username: username, password: password}
})

//绑定账号列表
export const get_account_list = ({limit,offset}) => sendGet({
    url: API.APP_ACCOUNT_LIST,
    params: {limit: limit, offset: offset}
})

//用户列表
export const get_client_list = ({limit,offset}) => sendGet({
    url: API.APP_CLIENT_LIST,
    params: {limit: limit, offset: offset}
})

//代理信息列表
export const get_agent_list = ({limit,offset}) => sendGet({
    url: API.APP_AGENT_LIST,
    params: {limit: limit, offset: offset}
})

//收益统计
export const get_profit_list = ({limit,offset}) => sendGet({
    url: API.APP_PROFIT_LIST,
    params: {limit: limit, offset: offset}
})


//收益统计-明细
export const get_profit_detail_list = ({limit,offset,create_date}) => sendGet({
    url: API.APP_PROFIT_DETAIL_LIST,
    params: {limit: limit, offset: offset,create_date:create_date}
})

