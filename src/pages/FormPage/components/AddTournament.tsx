import { Form, Input, Modal } from "antd";

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    open: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    open,
    onCreate,
    onCancel,
}) => {
    const [form] = Form.useForm();
//模态框    
    return (
        <Modal
            open={open}
            title="更新运动员信息"
            okText="添加"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                name="form_in_modal"
                layout="vertical"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    name="eventName"
                    label="比赛名称"
                    rules={[{ required: true, message: '请输入运动员名称!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="athleteNumber"
                    label="总参赛人数"
                    rules={[{ required: true, message: '请输入总参赛人数' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="eventTime"
                    label="每局比赛时间"
                    rules={[{ required: true, message: '请输入每局比赛时间' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="preliminaryNumber"
                    label="预赛组数"
                    rules={[{ required: true, message: '请输入预赛组数' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="preliminaryAccess"
                    label="预赛通过人数"
                    rules={[{ required: true, message: '请输入预赛通过人数' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="quarterFinalsNumber"
                    label="复赛组数"
                    rules={[{ required: true, message: '请输入次赛组数' }]}
                >  <Input />
                </Form.Item>
                <Form.Item
                    name="quarterFinalsAccess"
                    label="次赛通过人数"
                    rules={[{ required: true, message: '请输入次赛通过人数' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="semiFinalNumber"
                    label="复赛组数"
                    rules={[{ required: true, message: '请输入复赛组数' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="semiFinalAccess"
                    label="复赛通过人数"
                    rules={[{ required: true, message: '请输入复赛通过人数' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="finalNumber"
                    label="决赛组数"
                    rules={[{ required: true, message: '请输入决赛组数' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="finalAccess"
                    label="决赛通过人数"
                    rules={[{ required: true, message: '请输入决赛通过人数' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CollectionCreateForm