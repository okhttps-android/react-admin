import {sendGet, sendPost} from './axiosUtils'
import {API} from './api.config'

export const limit=10
//limit=10&offset=10
//登录
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

//提现账号-列表
export const get_withdaw_list = ({limit,offset}) => sendGet({
    url: API.APP_WITHDRAW_ACCOUNT,
    params: {limit: limit, offset: offset}
})
//提现请求-列表
export const get_withdraw_request_list = ({limit,offset}) => sendGet({
    url: API.APP_WITHDRAW_REQUEST,
    params: {limit: limit, offset: offset}
})

//提现请求-新增
export const get_withdraw_request_add = ({amount,withdraw_account_id,withdraw_password}) => sendPost({
    url: API.APP_WITHDRAW_REQUEST_ADD,
    params: {amount: amount, withdraw_account_id: withdraw_account_id,withdraw_password:withdraw_password}
})

//提现账号-更新微信
export const update_wechat = ({third_part_account,real_name}) => sendPost({
    url: API.APP_WITHDRAW_REQUEST_ADD,
    params: {third_part_account: third_part_account, real_name: real_name}
})
//提现账号-更新支付宝
export const update_alipay = ({third_part_account,real_name}) => sendPost({
    url: API.APP_WITHDRAW_REQUEST_ADD,
    params: {third_part_account: third_part_account, real_name: real_name}
})
//提现账号-更新银行
export const update_bank = ({bank_name,bank_no,real_name}) => sendPost({
    url: API.APP_WITHDRAW_ACCOUNT_UPDATE_BANK,
    params: {bank_name: bank_name, bank_no: bank_no,real_name:real_name}
})

//修改提现密码