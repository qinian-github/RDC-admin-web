import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Select, InputNumber, DatePicker, Button } from 'antd';
import { BookingApi } from '@/api';
import { setModalVisible } from '../../../stores/slices/modal';
import moment from 'moment';

const { Option } = Select;

export default function Mymodal() {
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const currentId = useSelector((state) => state.modal.currentId);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [form] = Form.useForm();

  // useEffect(() => {
  //   if (currentId) {
  //     console.log('执行');
  //     ExamineApi.GetEnrollInfo({
  //       userId: currentId,
  //     })
  //       .then((response: any) => {
  //         console.log(response);
  //         setData(response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching data: ', error);
  //       });
  //   }
  // }, [currentId]);

  const closeModal = () => {
    dispatch(setModalVisible(false));
  };

  const handleSubmit = async () => {
    try {
      let values = await form.validateFields();
      console.log(values);
      values = {
        ...values,
        fromTime: values.fromTime.format('YYYY-MM-DD HH:mm:ss'),
        toTime: values.toTime.format('YYYY-MM-DD HH:mm:ss'),
      };
      console.log(values);
      BookingApi.addReservation(values);
      // 发送请求
      // const response = await axios.post('/your-api-endpoint', values);
      // console.log(response);
      // 关闭模态框
      closeModal();
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  };

  return (
    <Modal
      title="详情"
      visible={modalVisible}
      onCancel={closeModal}
      footer={[
        <Button key="back" onClick={closeModal}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          提交
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="progress"
          label="进度"
          rules={[{ required: true, message: '请选择进度' }]}
        >
          <Select placeholder="请选择进度">
            <Option value="1">面试</Option>
            <Option value="4">一轮</Option>
            <Option value="7">二轮</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="groupType"
          label="考核方向"
          rules={[{ required: true, message: '请选择考核方向' }]}
        >
          <Select placeholder="请选择考核方向">
            <Option value="1">前端</Option>
            <Option value="2">后台</Option>
            <Option value="3">UI</Option>
            <Option value="4">AI</Option>
            <Option value="5">安卓</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="remain"
          label="可预约人数"
          rules={[{ required: true, message: '请输入可预约人数' }]}
          style={{ width: '300px' }}
        >
          <InputNumber
            min={0}
            max={50}
            style={{ width: '300px' }}
            placeholder="请输入可预约人数"
          />
        </Form.Item>
        <Form.Item
          name="fromTime"
          label="预约时间段开始时间"
          rules={[{ required: true, message: '请选择预约时间段开始时间' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name="toTime"
          label="预约时间段结束时间"
          rules={[{ required: true, message: '请选择预约时间段结束时间' }]}
        >
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
