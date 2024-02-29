import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { RequestInterceptor, ResponseInterceptor } from './types';
import { message } from 'antd';

export let API_DOMAIN = 'http://47.115.221.236/manage'
if (process.env.NODE_ENV === 'production') {
  API_DOMAIN = 'http://47.115.221.236/manage'
}

// 通用请求配置
const commonRequestConfig: AxiosRequestConfig = {
  baseURL: API_DOMAIN,
  timeout: 3000,
  headers: {
    // 'Authorization': localStorage.getItem('userLoginInfo') ? JSON.parse(localStorage.getItem('userLoginInfo') || '').token : '',
  },
  // 表示支持跨域请求携带Cookie，默认是false，表示不携带Cookie
  // 同时需要后台配合，返回需要有以下字段，
  // 如果该字段设置为true，但是后台没有返回以下两个字段的话浏览器是会报错的
  // Access-Control-Allow-Credentials: true
  // Access-Control-Allow-Origin: 当前页面的域名
  withCredentials: false,
};

// 通用的请求拦截器
const commonRequestInterceptors: RequestInterceptor[] = [
  {
    onFulfilled: (config: InternalAxiosRequestConfig) => {
      // 在这里一般会携带前台的参数发送给后台，比如下面这段代码：
      const token = localStorage.getItem('userLoginInfo') ? 'Bearer '+JSON.parse(localStorage.getItem('userLoginInfo') || '').token : ''
      if (token) {
        config.headers.Authorization = token
      }
      return config;
    },
    onRejected: (error) => {
      const errorMsg = error?.message || 'Request Error';
      message.error(errorMsg)
      return Promise.reject(error);
    },
  },
];

// 通用的响应拦截器
const commonResponseInterceptors: ResponseInterceptor[] = [
  {
    onFulfilled: (response: AxiosResponse) => {
      // 这里我们将后台返回的数据解构出来返回，方便后续获取
      const { data } = response;
      return data;
      // 这里根据其它业务可以做其它特殊的拦截，比如根据后台返回的data有固定的格式，根据后台返回的code可以做一些统一处理，比如像下面这样
      // const { code, message, data } = response.data;

      // // 根据自定义错误码判断请求是否成功
      // if (code === 0) {
      //   // 将组件用的数据返回
      //   return data;
      // } else {
      //   // 处理业务错误。
      //   ElMessage({
      //     message: message,
      //     type: 'error',
      //   });
      //   return Promise.reject(new Error(message));
      // }
    },
    onRejected: (error) => {
      const { response } = error;
      // 处理 HTTP 网络错误
      let msg = '';
      // HTTP 状态码
      const status = response?.status;
      switch (status) {
        case 401:
          msg = 'token 失效，请重新登录';
          // 这里可以触发退出的 action
          break;
        case 403:
          msg = '拒绝访问';
          break;
        case 404:
          msg = '请求地址错误';
          break;
        case 500:
          msg = '服务器故障';
          break;
        default:
          msg = '网络连接故障';
      }
      message.error(msg)
      return Promise.reject(error);
    },
  },
];

export {
  commonRequestConfig,
  commonRequestInterceptors,
  commonResponseInterceptors,
};
