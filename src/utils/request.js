import axios from 'axios'
import JSONBig from 'json-bigint'

// 它会把超出 js 安全整数范围的数字转为一种类型为 BigNumber 的对象
// 我们在使用的时候需要把这个 BigNumber.toString() 就能得到原来正确的数字

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    // 定制后端返回的原始数据的处理
    // 参数 data 就是后端返回的原始数据(未经处理的JSON格式字符串)
    try {
      return JSONBig.parse(data)
    } catch (err) {
      console.log(err)
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 所有请求会经过这里
  function (config) {
    // config 是当前请求相关的配置信息对象

    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    return config
    // 不 return config 的话 就会拦截所有请求
  }, function (error) {
    return Promise.reject(error)
  })

export default request
