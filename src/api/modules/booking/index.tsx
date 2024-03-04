import { BookingInstance } from '@/api';
// import { listAllTournamentRes } from './types';

const { get, post } = BookingInstance;
//更新预约时间段剩余人数
const updateReservation = (data: any) => {
  return post('/updateReservation', data);
};
//查看所有预约时间段
const getAllReservation = (data: any) => {
  return get('/getAllReservation', data);
};
//添加预约时间段
const addReservation = (data: any) => {
  return post('/addReservation', data);
};

export { updateReservation, getAllReservation, addReservation };
