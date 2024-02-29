import { ExamineInstance } from '@/api';
// import { listAllTournamentRes } from './types';

const { get, post } = ExamineInstance;
//查询考核人员信息
const GetUserInfo = (data: any) => {
  return get('/getUserInfo', data);
};
//根据id获取考核人员信息
const GetEnrollInfo = (data: any) => {
  return get('/getEnrollInfo', data);
};
//批量修改考核人员信息
const UpdateProgress = (data: any) => {
  return post('/updateProgress', data);
};

export { GetUserInfo, GetEnrollInfo, UpdateProgress };
