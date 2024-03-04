import React from 'react';
import { Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  setModalVisible,
  setCurrentRecord,
  setCurrentId,
} from '../../../stores/slices/modal';

export default function DetailLink() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setModalVisible(true));
    // dispatch(setCurrentRecord(re);
    // dispatch(setCurrentId(record.userId)); // 添加这一行
    // console.log(record.userId);
  };

  return (
    <Button key="editable" onClick={handleClick}>
      添加预约时间段
    </Button>
  );
}
