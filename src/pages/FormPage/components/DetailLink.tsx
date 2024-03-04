import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setModalVisible,
  setCurrentRecord,
  setCurrentId,
} from '../../../stores/slices/modal';

export default function DetailLink({ record, action }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    action?.startEditable?.(record.id);
    dispatch(setModalVisible(true));
    dispatch(setCurrentRecord(record));
    dispatch(setCurrentId(record.userId)); // 添加这一行
    console.log(record.userId);
  };

  return (
    <a key="editable" onClick={handleClick}>
      详情
    </a>
  );
}
