import { messageInstance } from '@/api';
import { RecordParams } from './types';

const { get: baseGet } = messageInstance;

const getRecord = (recordParams: RecordParams) => {
  // return baseGet<RecordRes>('/getRecord', recordParams);
  return baseGet('/getRecord', recordParams);
};

export { getRecord };
