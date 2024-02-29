import { messageInstance } from '@/api';
import { RecordParams } from './types';

const { get: baseGet, post: basePost } = messageInstance;

const getRecord = (recordParams: RecordParams) => {
  // return baseGet<RecordRes>('/getRecord', recordParams);
  return baseGet('/getRecord', recordParams);
};

const batchSend = (params: number) => {
  return basePost('/batchSend?progress=' + params)
}

export { getRecord, batchSend };
