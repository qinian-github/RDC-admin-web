import { Form, Modal, InputNumber } from 'antd';
import { useState } from 'react';
import { BookingApi } from '@/api';

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
      const params = new URLSearchParams();
      params.append('reservationId', selectedKeys);

      console.log('selectedKeys', selectedKeys);
      params.append('remain', values.peoplenum.toString());
      await BookingApi.updateReservation(params);
      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={open}
      title="修改录取人数"
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
          name="peoplenum"
          rules={[{ required: true, message: '请输入录取人数' }]}
          style={{ marginBottom: '20px' }}
        >
          <InputNumber
            min={0}
            max={50}
            placeholder="请输入录取人数"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
