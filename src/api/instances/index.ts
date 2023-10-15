import createInstance from './create';

// 基础的Axios实例，请求配置以及拦截器都是使用的通用的配置
const baseInstance = createInstance({}, [], []);

// 如果需要对请求和返回做特殊处理，也可以在这里加拦截器
const adminInstance = createInstance(
  {
    baseURL: '/admin',
  },
  [],
  []
);

export { baseInstance, adminInstance };