import {sendGet, sendPost} from './axiosUtils'
import {API} from './api.config'


//代理接口
export const login = ({username,password}) => sendPost({
    url: API.APP_LOGIN,
    params: {username: username, password: password}
})

