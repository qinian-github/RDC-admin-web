import { baseInstance } from '@/api';
import { CaptchaParams, CaptchaRes } from './types';

const { get: baseGet } = baseInstance;

const getCaptcha = () => {
  return baseGet<CaptchaRes>('/getCaptcha');
};

export { getCaptcha };
