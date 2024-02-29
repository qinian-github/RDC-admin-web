import React, { useState } from "react";
// import DemoCard from "./components/DemoCard";
import { Button, Card, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

type LayoutType = Parameters<typeof Form>[0]['layout'];

const Home: React.FC = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<any>('Vertical');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const onFinish = (values: any) => {
    console.log(values);
    axios.post('http://47.115.221.236/manage/announcement/addAnnouncement', values, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage.getItem('userLoginInfo') ? 'Bearer ' + JSON.parse(localStorage.getItem('userLoginInfo') || '').token : '',
      }
    }).then(res => {
      const data = res.data;
      if (data.code == 200) {
        message.success(data.msg)
      } else {
        message.error(data.msg)
      }
    });
  };

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

  return (
    <React.Fragment>
      {/* <DemoCard /> */}
      <Card
        title='公告'>
        <Form
          {...formItemLayout}
          layout={formLayout}
          onFinish={onFinish}
          form={form}
          initialValues={{ layout: formLayout }}
          onValuesChange={onFormLayoutChange}
          style={{ maxWidth: formLayout === 'inline' ? 'none' : 600 }}
        >
          {/* <Form.Item label="Form Layout" name="layout">
            <Radio.Group value={formLayout}>
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item> */}
          <Form.Item label='标题' name="title">
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item label='正文' name="text">
            <TextArea rows={4} placeholder="请输入正文" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" block htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
};

export default Home;