let env = ''
if ((/env=online/.test(window.location.href))) {
    env = 'online'
} else if ((/env=dev/.test(window.location.href))) {
    env = 'dev'
} else {
    env = 'dev' // 默认环境
}
const SERVER_URL_LIST = {
    online: { // 正式环境
        SERVER_URL1: '',
        SERVER_URL2: '',
        SERVER_URL3: ''
    },
    dev: { // 测试环境
        SERVER_URL1: 'http://34.92.48.253/',
        SERVER_URL2: '',
        SERVER_URL3: ''
    }
}

//项目根路径
export const SERVER_URL = SERVER_URL_LIST[env].SERVER_URL1;

export const API = {
    //登录
    APP_LOGIN: SERVER_URL + "lqdb-agent-api/user/login/",
    //登出
    APP_LOGOUT: SERVER_URL + "lqdb-agent-api/user/logout/",
    //修改密码
    APP_USER_UPDATE: SERVER_URL + "lqdb-api/user/user-info/",
    ///请求验证码
    APP_SMS_CODE: SERVER_URL + "lqdb-agent-api/user/sms-auth-code/",
    //绑定账号列表
    APP_ACCOUNT_LIST: SERVER_URL + "lqdb-agent-api/user/app-account/list/",
    //APP账号-绑定
    APP_ACCOUNT_BIND: SERVER_URL + "lqdb-agent-api/user/app-account/bind/",

    //用户列表
    APP_CLIENT_LIST: SERVER_URL + "lqdb-agent-api/agent/my-friend/list/",
    //下级代理-列表
    APP_AGENT_LIST:SERVER_URL + "lqdb-agent-api/agent/subordinate/list/",
    //下级代理-新增
    APP_AGENT_ADD:SERVER_URL + "lqdb-agent-api/agent/subordinate/add/",
    //修改分成比例
    APP_AGENT_UPDATE_PROFIT_RATE:SERVER_URL + "lqdb-agent-api/agent/subordinate/update-profit-rate/",
    //收益统计
    APP_PROFIT_LIST:SERVER_URL + "lqdb-agent-api/fund/profit/summary/by-date/",
    //收益统计-明细
    APP_PROFIT_DETAIL_LIST:SERVER_URL + "lqdb-agent-api/fund/profit/history/list/",


    //提现账号-列表
    APP_WITHDRAW_ACCOUNT:SERVER_URL + "lqdb-agent-api/fund/withdraw/account/list/",
    //提现请求-列表
    APP_WITHDRAW_REQUEST:SERVER_URL + "lqdb-agent-api/fund/withdraw/request/list/",
    //提现请求-新增
    APP_WITHDRAW_REQUEST_ADD:SERVER_URL + "lqdb-agent-api/fund/withdraw/request/add/",
    //提现账号-更新微信
    APP_WITHDRAW_ACCOUNT_UPDATE_WECHAT:SERVER_URL + "lqdb-agent-api/fund/withdraw/account/wechat/update/",
    //提现账号-更新支付宝
    APP_WITHDRAW_ACCOUNT_UPDATE_ALIPAY:SERVER_URL + "lqdb-agent-api/fund/withdraw/account/alipay/update/",
    //提现账号-更新银行
    APP_WITHDRAW_ACCOUNT_UPDATE_BANK:SERVER_URL + "lqdb-agent-api/fund/withdraw/account/bank/update/",
    //修改提现密码
    APP_WITHDRAW_UPDATE_PASSWORD:SERVER_URL + "lqdb-agent-api/fund/withdraw/password/update/",
}

export default SERVER_URL_LIST[env]