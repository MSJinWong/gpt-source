import request from '@/utils/request'

// 登录接口
export const Login = data => {
    return request({
        url: '/user/login',
        method: 'post',
        data,
    })
}
// 注册接口
export const registeredUsers = data => {
    return request({
        url: '/user/register',
        method: 'post',
        data,
    })
}

export const getUserType = () =>{
    return request({
        url:"/ai/tips",
        method: 'get'
    })
}

//获取历史会话
export const historicalConversation = () => {
    return request({
        url:"/ai/logs",
        method: 'get'
    })
}

//删除历史会话
export const historicalDeleList = (params) => {
    return request({
        url:"/ai/logs",
        method: 'delete',
        params
    })
}

//删除所有历史会话
export const deleListAll = () => {
    return request({
        url:"/ai/all_logs",
        method: 'delete'
    })
}
