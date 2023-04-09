import axios from 'axios'
import Vue from 'vue'
import router from './router'

// 创建axios实例
const http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  baseURL: 'http://localhost:3000/admin/api'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.token){
    config.headers.Authorization = 'Bearer '+ localStorage.token;
  } 
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应时的拦截器 通用的错误处理
http.interceptors.response.use(res=>{
  return res
},err=>{
  // 对错误做些什么
  if (err.response.data.message){
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if (err.response.status == 401){
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

export default http