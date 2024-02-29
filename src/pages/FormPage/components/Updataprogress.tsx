import { Form, Modal, Select } from 'antd';
import { useState } from 'react';
import { ExamineApi } from '@/api';
const { Option } = Select;

const options = [
  '未报名',
  '面试未预约/查面试预约情况',
  '面试已预约',
  '面试未通过',
  '一轮未预约/查一轮预约情况',
  '一轮已预约',
  '一轮未通过',
  '二轮未预约/查二轮预约情况',
  '二轮已预约',
  '二轮未通过',
  '通过考核',
];

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  selectedKeys: any;
  selectedRows: any; // 你需要替换 Key 和 RowType 为实际的类型
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,

  onCancel,
  selectedKeys,
  selectedRows,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  console.log(selectedKeys, selectedRows);
  const handleSubmit = async () => {
    setLoading(true);
    const values = form.getFieldsValue();
    console.log(values);
    try {
      // 发送请求到服务器
      console.log(selectedKeys);
      // let res = await ExamineApi.UpdateProgress({
      //   userIds: selectedKeys,
      //   progress: values.status,
      // });
      fetch('http://47.115.221.236/manage/examine/updateProgress', {
        userIds: selectedKeys,
        progress: values.status,
      })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
      //   progress: values.status,;
      // let res = await ExamineApi.UpdateProgress({
      //   userIds: selectedKeys,
      //   progress: values.status,
      // });

      // 请求成功后，你可以清空表单
      form.resetFields();
    } catch (error) {
      // 处理请求失败的情况
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //模态框
  return (
    <Modal
      visible={open}
      title="更新考核信息"
      okText="提交"
      cancelText="取消"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form
        form={form}
        layout="inline"
        style={{ padding: '20px', width: '100%', height: '100%' }}
      >
        <Form.Item
          name="status"
          rules={[{ required: true, message: '请选择状态' }]}
          style={{ marginBottom: '20px' }}
        >
          <Select placeholder="请选择状态" style={{ width: '100%' }}>
            {options.map((option, index) => (
              <Option key={index} value={index}>
                {option}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
