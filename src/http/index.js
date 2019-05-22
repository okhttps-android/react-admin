import {sendGet, sendPost} from './axiosUtils'
import {API} from './api.config'

export const limit=10
//limit=10&offset=10
//登录
export const login = ({username,password}) => sendPost({
    url: API.APP_LOGIN,
    params: {username: username, password: password}
})
//登出
export const user_logout = () => sendPost({
    url: API.APP_LOGOUT,
    params: {}
})

//修改用户登录密码
export const update_user_password = ({user_tel,password,code}) => sendPost({
    url: API.APP_USER_UPDATE,
    params: {user_tel:user_tel,password:password,code:code}
})



//绑定账号列表
export const get_account_list = ({limit,offset}) => sendGet({
    url: API.APP_ACCOUNT_LIST,
    params: {limit: limit, offset: offset}
})

//绑定APP账号
export const account_bind = ({tel,code}) => sendPost({
    url: API.APP_ACCOUNT_BIND,
    params: {tel: tel, code: code}
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
    url: API.APP_WITHDRAW_ACCOUNT_UPDATE_WECHAT,
    params: {third_part_account: third_part_account, real_name: real_name}
})
//提现账号-更新支付宝
export const update_alipay = ({third_part_account,real_name}) => sendPost({
    url: API.APP_WITHDRAW_ACCOUNT_UPDATE_ALIPAY,
    params: {third_part_account: third_part_account, real_name: real_name}
})
//提现账号-更新银行
export const update_bank = ({bank_name,bank_no,real_name}) => sendPost({
    url: API.APP_WITHDRAW_ACCOUNT_UPDATE_BANK,
    params: {bank_name: bank_name, bank_no: bank_no,real_name:real_name}
})

//修改提现密码
export const update_withdraw_password = ({user_tel,password,code}) => sendPost({
    url: API.APP_WITHDRAW_UPDATE_PASSWORD,
    params: {user_tel: user_tel, password: password,code:code}
})

//验证码
export const get_sms_code= ({user_tel,auth_type}) => sendPost({
    url: API.APP_SMS_CODE,
    params: {user_tel: user_tel, auth_type: auth_type}
})

//添加下级代理
export const agent_add= ({username,password,user_tel,profit_rate_present_for_parent,wechat_no,qq_no}) => sendPost({
    url: API.APP_AGENT_ADD,
    params: {
        username: username,
        password: password,
        user_tel:user_tel,
        profit_rate_present_for_parent:profit_rate_present_for_parent,
        wechat_no:wechat_no,
        qq_no:qq_no}
})

//修改分成比例
export const update_agent_profit_rate= ({id,profit_rate_present_for_parent}) => sendPost({
    url: API.APP_AGENT_UPDATE_PROFIT_RATE,
    params: {id,profit_rate_present_for_parent}
})
