import { adminInstance } from '@/api';
import { LoginParams, LoginRes, RegisterParams, RegisterRes} from './types';

const { post: adminPost } = adminInstance;

const login = (params: LoginParams) => {
  return adminPost<LoginRes>('/login', params);
};

const register = (params: RegisterParams) => {
  return adminPost<RegisterRes>('/register', params)
}

export { login, register };
