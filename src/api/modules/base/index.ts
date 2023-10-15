import { baseInstance } from '@/api';
import { CaptchaRes } from './types';

const { get: baseGet } = baseInstance;

const getCaptcha = () => {
  return baseGet<CaptchaRes>('/getCaptcha');
};

export { getCaptcha };
