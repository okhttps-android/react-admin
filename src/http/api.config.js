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
   APP_LOGIN: SERVER_URL+"lqdb-agent-api/user/login/",
    //绑定账号列表
    ///lqdb-agent-api/user/app-account/list/
    APP_ACCOUNT_LIST:SERVER_URL+"lqdb-agent-api/user/app-account/list/",
    //用户列表
    ///lqdb-agent-api/agent/my-friend/list/
    APP_CLIENT_LIST:SERVER_URL+"lqdb-agent-api/agent/my-friend/list/",
    //代理信息
    ///lqdb-agent-api/agent/subordinate/list/
    APP_AGENT_LIST:SERVER_URL+"lqdb-agent-api/agent/subordinate/list/",
    //收益统计
     ///lqdb-agent-api/fund/profit/list/
    APP_PROFIT_LIST:SERVER_URL+"lqdb-agent-api/fund/profit/summary/by-date/",
    //收益统计-明细
    ///lqdb-agent-api/fund/profit/history/list/?create_date=2019-03-15
    APP_PROFIT_DETAIL_LIST:SERVER_URL+"lqdb-agent-api/fund/profit/history/list/"


}

export default SERVER_URL_LIST[env]