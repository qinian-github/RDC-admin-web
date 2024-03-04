import createInstance from './create';
import { API_DOMAIN } from './commonConfig';

// 基础的Axios实例，请求配置以及拦截器都是使用的通用的配置
const baseInstance = createInstance({}, [], []);

// 如果需要对请求和返回做特殊处理，也可以在这里加拦截器
const adminInstance = createInstance(
  {
    baseURL: API_DOMAIN + '/admin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
  [],
  [],
);
const ExamineInstance = createInstance(
  {
    baseURL: API_DOMAIN + '/examine',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
  [],
  [],
);
const BookingInstance = createInstance(
  {
    baseURL: API_DOMAIN + '/reservation',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
  [],
  [],
);
const messageInstance = createInstance(
  {
    baseURL: API_DOMAIN + '/sms',
  },
  [],
  [],
);

export {
  baseInstance,
  adminInstance,
  messageInstance,
  ExamineInstance,
  BookingInstance,
};
