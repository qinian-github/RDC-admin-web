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
      // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbklkIjoxLCJhZG1pblJvbGUiOjEsImV4cCI6MTY5Nzk2MTQ1MywidXNlcm5hbWUiOiJhZG1pbiJ9.I7euD9twlUbCMZneR_ADK_pQSa2H9UI3m10BwMYGGDo',
    },
  },
  [],
  [],
);
const TournamentInstance = createInstance(
  {
    baseURL: API_DOMAIN + '/event',
  },
  [],
  [],
);
export { baseInstance, adminInstance,TournamentInstance };
