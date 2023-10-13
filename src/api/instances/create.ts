import axios, { AxiosRequestConfig } from 'axios';
import {
  commonRequestConfig,
  commonRequestInterceptors,
  commonResponseInterceptors,
} from './commonConfig';

import { RequestInterceptor, ResponseInterceptor } from './types';

// 创建请求实例，允许不同的实例设置不同的配置，这些配置会和默认配置合并
function createInstance(
  config: AxiosRequestConfig,
  requestInterceptors: RequestInterceptor[],
  responseInterceptors: ResponseInterceptor[]
) {
  const instance = axios.create({
    ...commonRequestConfig,
    ...config,
  });

  const allRequestInterceptors: RequestInterceptor[] = [
    ...commonRequestInterceptors,
    ...requestInterceptors,
  ];

  // 设置所有请求拦截器
  allRequestInterceptors.forEach((requestInterceptor) => {
    instance.interceptors.request.use(
      requestInterceptor.onFulfilled,
      requestInterceptor.onRejected
    );
  });

  const allResponseInterceptors: ResponseInterceptor[] = [
    ...commonResponseInterceptors,
    ...responseInterceptors,
  ];

  // 设置所有响应拦截器
  allResponseInterceptors.forEach((responseInterceptor) => {
    instance.interceptors.response.use(
      responseInterceptor.onFulfilled,
      responseInterceptor.onRejected
    );
  });

  // 导出常用函数

  /**
   * @param {string} url
   * @param {object} data
   * @param {object} params
   */
  function post<T>(url: string, data = {}, params = {}): Promise<T> {
    return instance({
      method: 'post',
      url,
      data,
      params,
    });
  }

  /**
   * @param {string} url
   * @param {object} params
   */
  function get<T>(url: string, params = {}): Promise<T> {
    return instance({
      method: 'get',
      url,
      params,
    });
  }

  /**
   * @param {string} url
   * @param {object} data
   * @param {object} params
   */
  function put<T>(url: string, data = {}, params = {}): Promise<T> {
    return instance({
      method: 'put',
      url,
      params,
      data,
    });
  }

  /**
   * @param {string} url
   * @param {object} params
   */
  function _delete<T>(url: string, params = {}): Promise<T> {
    return instance({
      method: 'delete',
      url,
      params,
    });
  }

  return {
    instance,
    post,
    get,
    put,
    _delete,
  };
}

export default createInstance;
