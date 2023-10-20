import { baseInstance } from '@/api';
import { CaptchaRes, ExportFileParams } from './types';

const { get: baseGet } = baseInstance;

const getCaptcha = () => {
  return baseGet<CaptchaRes>('/getCaptcha');
};

const exportFile = (params: ExportFileParams) => {
  return baseGet(`/export?group=${params}`);
};

export { getCaptcha, exportFile };
