import { messageApi } from "@/api";
import React, { useEffect, useState } from "react";
import { Button, Card, Form, Pagination, PaginationProps, Select, Space, Tag } from 'antd';
import { ProCard } from "@ant-design/pro-components";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { FloatButton } from "antd/lib";

const { Option } = Select;

type Currency = string;

interface StuCard {
  smsRecordId: number,
  realName: string,
  schoolNumber: string,
  smsContent: string,
  createTime: string,
  receiveTime: string,
  status: number
}

const MessagePage: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('面试未通过');
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(1);
  const [records, setRecords] = useState([]);
  const [progress, setProgress] = useState(3);
  const [total, setTotal] = useState(10);
  const [msg, setMsg] = useState('');

  const onCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    updatedRecord(Number(newCurrency), current)
    setProgress(Number(newCurrency))
  };

  const updatedRecord = (progress: number, pageIndex: number) => {
    messageApi.getRecord({
      progress: progress,
      pageIndex: pageIndex,
      pageSize: 10
    }).then((res: any) => {
      if (res.data) {
        setRecords(res.data.records)
        setTotal(res.data.total)
      }
      else {
        setMsg(res.msg)
        setRecords([])
      }
    });
  }

  const onFinish = () => {
    messageApi.batchSend(progress).then(() => { // Add type annotation to specify the type of 'res'
      updatedRecord(progress, current)
    })
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
    updatedRecord(progress, page)
  };

  useEffect(() => {
    form.setFieldValue('progress', { 'currency': "3" });
    updatedRecord(3, 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ProCard
      style={{ height: '100%' }}
    >
      <Form
        name="customized_form_controls"
        layout="inline"
        onFinish={onFinish}
        form={form}
        style={{ display: "flex", justifyContent: 'space-between' }}
        initialValues={{
          price: {
            currency: '面试未通过',
          },
        }}
      >
        <Form.Item name="progress" label="考核进度">
          <span>
            <Select
              value={currency}
              defaultValue={currency}
              style={{ width: 180, margin: '0 8px' }}
              onChange={onCurrencyChange}
            >
              <Option value="3">面试未通过</Option>
              <Option value="4">面试通过</Option>
              <Option value="6">一轮未通过</Option>
              <Option value="7">一轮通过</Option>
              <Option value="9">二轮未通过</Option>
              <Option value="10">通过考核</Option>
            </Select>
          </span>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            发送改考核进度通知
          </Button>
        </Form.Item>
      </Form>
      <main style={{ height: '84%', width: '100%', margin: '20px 0px', display: 'flex', flexWrap: 'wrap' }}>
        {
          records.length != 0 ? records.map((item: StuCard) =>
            <Card key={item.smsRecordId} title={`${item.realName}    ${item.schoolNumber}`} style={{ width: 300, maxHeight: '46%', margin: '0px 10px' }}>
              <p>{item.smsContent}</p>
              <Space size={[0, 8]} wrap>
                {
                  item.status === 1 ? <Tag icon={<CheckCircleOutlined />} color="success">
                    送达成功
                  </Tag> : item.status === 0 ? <Tag icon={<SyncOutlined spin />} color="processing">
                    发送中
                  </Tag> : <Tag icon={<CloseCircleOutlined spin />} color="error">
                    送达失败</Tag>
                }
              </Space>
              <p style={{ color: 'gray', fontSize: '12px' }}>发送时间: {item.createTime}</p>
              <p style={{ color: 'gray', fontSize: '12px' }}>收到时间: {item.receiveTime}</p>
            </Card>) : <div>{msg}</div>
        }
      </main>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination current={current} onChange={onChange} total={total} />
      </div>
      <FloatButton icon={<ReloadOutlined />} type="primary" onClick={() => { updatedRecord(progress, current) }} style={{ right: 94, bottom: 100 }} />
    </ProCard>
  );
};

export default MessagePage;