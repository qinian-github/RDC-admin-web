import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'antd';
import ProList from '@ant-design/pro-list';
import { ExamineApi } from '@/api';
import {
  getCollegeName,
  getRoleName,
  getStatusName,
} from '../../../utils/getConst';
import { setModalVisible } from '../../../stores/slices/modal';

export default function Mymodal() {
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const currentId = useSelector((state) => state.modal.currentId);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (currentId) {
      console.log('执行');
      ExamineApi.GetEnrollInfo({
        userId: currentId,
      })
        .then((response: any) => {
          console.log(response);
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
    //   axios.get(`/your-api-endpoint?id=${currentId}`).then((response) => {
    //     setData(response.data.data);
    //   });
    // }
  }, [currentId]);

  const closeModal = () => {
    dispatch(setModalVisible(false));
  };

  const metas = {
    // title: {
    //   dataIndex: 'realName',
    // },
    // description: {
    //   dataIndex: 'selfIntroduction',
    // },
    subTitle: {
      render: (_, record) => (
        <>
          <p>姓名：{record.realName}</p>
          <p>性别：{record.sex == '0' ? '男' : '女'}</p>
          <p>学号：{record.schoolNumber}</p>
          <p>手机号：{record.phoneNumber}</p>
          <p>学院：{getCollegeName(record.college)}</p>
          <p>专业班级：{record.majorClass}</p>
          <p>考核组别方向：{getRoleName(record.groupType)}</p>
          <p>自我介绍：</p>
          <p>{record.selfIntroduction}</p>
        </>
      ),
    },
  };

  return (
    <Modal
      title="详情"
      visible={modalVisible}
      onCancel={closeModal}
      footer={null}
    >
      <ProList
        rowKey="id"
        headerTitle="报名表详情"
        dataSource={data ? [data] : []}
        metas={metas}
      />
    </Modal>
  );
}
