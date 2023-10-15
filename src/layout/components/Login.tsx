import { useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  SafetyOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  LoginFormPage,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useSelector, useDispatch } from 'react-redux'
import { message, Tabs } from "antd";
import { setUserInfo } from "@/stores/slices/auth";
import { getCaptcha } from "@/api/modules/base";
import { login, register } from "@/api/modules/admin";
import { LoginParams, LoginRes, RegisterParams, RegisterRes } from '@/api/modules/admin/types'

type LoginType = "login" | "register";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Login = () => {
  const [loginType, setLoginType] = useState<LoginType>("login");
  const [captcha, setCaptcha] = useState('https://ts1.cn.mm.bing.net/th/id/R-C.2c1de1f078a7d4bdb67ea420bac10ae9?rik=lO0B7c2ar%2fNgzA&riu=http%3a%2f%2fwww.gift2n.com%2findex.php%2fPublic%2fverify.html&ehk=1lX6iBcIhAgPgPUhIZljLeeRVD15LbrulFJOh72%2fDuw%3d&risl=&pid=ImgRaw&r=0')
  const userInfo = useSelector((state: any) => state.auth);
  const [uuid, setUuid] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const refreshCaptcha = async () => {
    const { data } = await getCaptcha()
    setCaptcha(data.img)
    setUuid(data.uuid)
  }

  useEffect(() => {
    if (userInfo.username) {
      navigate("/", { replace: true });
    }
    refreshCaptcha()
  })

  const onFinish = (values: any) => {
    if (loginType === 'login') {
      const { loginUsername: username, loginPassword: password, loginCaptcha: code } = values
      const params: LoginParams = { username, password, code, uuid }
      return delay(1000).then(() => {
        login(params).then((res: LoginRes) => {
          if (res.code === '200') {
            message.success("登录成功🎉🎉🎉");
            dispatch(setUserInfo({ username }))
            navigate("/", { replace: true });
          }
        })
      })
    } else {
      const { loginUsername: username, loginPassword: password, loginCaptcha: code, roleSelect: roleId } = values
      const params: RegisterParams = { username, password, code, uuid, roleId }
      return delay(1000).then(() => {
        register(params).then((res: RegisterRes) => {
          if (res.code === '200') {
            message.success("注册成功🎉🎉🎉");
          }
        })
      })
    }
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
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
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
              key: 'login',
              label: '登录',
            },
            {
              key: 'register',
              label: '注册',
            }
          ]}
        >
        </Tabs>
        {loginType === "login" && (
          <>
            <ProFormText
              name="loginUsername"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"用户名:"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText.Password
              name="loginPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码:"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
            <div style={{ display: "flex" }}>
              <ProFormText
                name="loginCaptcha"
                width={220}
                fieldProps={{
                  size: "large",
                  prefix: <SafetyOutlined className={"prefixIcon"} />,
                }}
                placeholder={"验证码:"}
                rules={[
                  {
                    required: true,
                    message: "请输入验证码！",
                  },
                ]}
              />
              <img onClick={refreshCaptcha} src={captcha} style={{ flexGrow: 1, height: 40, padding: 5 }} alt="" />
            </div>
          </>
        )}
        {loginType === "register" && (
          <>
            <ProFormText
              name="registerUsername"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"用户名:"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            />
            <ProFormText.Password
              name="registerPassword"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码:"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
            <ProFormSelect
              name="roleSelect"
              valueEnum={{
                0: ' 前端',
                1: ' 后端',
                2: ' 安卓',
                3: ' UI',
                4: ' AI',
              }}
              fieldProps={{
                size: "large",
              }}
              placeholder="请选择部门"
              rules={[{ required: true, message: '请选择部门' }]}
            />
            <div style={{ display: "flex" }}>
              <ProFormText
                name="registerCaptcha"
                width={220}
                fieldProps={{
                  size: "large",
                  prefix: <SafetyOutlined className={"prefixIcon"} />,
                }}
                placeholder={"验证码:"}
                rules={[
                  {
                    required: true,
                    message: "请输入验证码！",
                  },
                ]}
              />
              <img onClick={refreshCaptcha} src={captcha} style={{ flexGrow: 1, height: 40, padding: 5 }} alt="" />
            </div>
          </>
        )}
      </LoginFormPage>
    </div>
  );
};

export default Login;
