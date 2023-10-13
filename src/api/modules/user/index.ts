import { baseInstance } from '@/apis';
import { LoginParams, LoginRes, UserInfoParams, UserInfoRes } from './types';

const { post: basePost, get: baseGet } = baseInstance;

const login = (params: LoginParams) => {
  return basePost<LoginRes>('/login', params);
};

const getUserInfo = (params: UserInfoParams) => {
  return baseGet<UserInfoRes>('/userinfo', { params });
};

export { login, getUserInfo };
