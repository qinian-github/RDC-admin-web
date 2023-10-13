import { useState } from "react";
import {
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  LoginFormPage,
  ProFormText,
} from "@ant-design/pro-components";
import { message, Tabs } from "antd";

type LoginType = "phone" | "account";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Login = () => {
  const [loginType, setLoginType] = useState<LoginType>("account");
  //   const { setUserInfo } = useLoginStore();
  const navigate = useNavigate();
  const onFinish = (values: unknown) => {
    return delay(1000).then(() => {
      message.success("登录成功🎉🎉🎉");
      //   setUserInfo(values);
      console.log(values);

      navigate("/", { replace: true });
    });
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        onFinish={onFinish}
        title="RDC-Admin-Web"
        subTitle="后台管理系统"
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          items={[
            {
              key: 'account',
              label: '账号密码登录',
            }
          ]}
        >
        </Tabs>
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={"prefixIcon"} />,
            }}
            placeholder={"用户名: admin or user"}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined className={"prefixIcon"} />,
            }}
            placeholder={"密码: 123456"}
            rules={[
              {
                required: true,
                message: "请输入密码！",
              },
            ]}
          />
      </LoginFormPage>
    </div>
  );
};

export default Login;
