import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL:  process.env.NODE_ENV === "development" ? '/api' : "",
  timeout: 10000,
  withCredentials: true,
})

// 拦截请求
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // console.log(error);
    return Promise.reject(error)
  }
)

// 拦截响应
service.interceptors.response.use(
  // 响应成功进入第1个函数，该函数的参数是响应对象
  response => {
    if(response.data.code !== 200){
      ElMessage.error(response.data.msg);
    }
    return response.data
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async error => {
    // 如果响应码是 401 ，则请求获取新的 token
    // 响应拦截器中的 error 就是那个响应的错误对象
    if (error.response && error.response.status === 401 && error.response.status === 500) {
      ElMessage.error("请求有问题状态码："+error.response.status+",描述："+error.msg)
    }
    // console.dir(error) // 可在此进行错误上报
    ElMessage.closeAll()
    try {
      ElMessage.error(error.response.data.msg)
    } catch (err) {
      ElMessage.error(error.message)
    }

    return Promise.reject(error)
  }
)

export default service
