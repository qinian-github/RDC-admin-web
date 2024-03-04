import { useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  SafetyOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  LoginFormPage,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { useSelector, useDispatch } from 'react-redux'
import { Tabs } from "antd";
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
  const [captcha, setCaptcha] = useState('')
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
    if (userInfo.token) {
      navigate("/", { replace: true });
    } else {
      refreshCaptcha()
    }
  }, [navigate, userInfo.token])

  const onFinish = (values: any) => {
    if (loginType === 'login') {
      const { loginUsername: username, loginPassword: password, loginCaptcha: code } = values
      const params: LoginParams = { username, password, code, uuid }
      return delay(1000).then(() => {
        login(params).then((res: LoginRes) => {
          if (res.code == 200) {
            dispatch(setUserInfo(res.data))
            navigate("/", { replace: true });
          }
        })
      })
    } else {
      // eslint-disable-next-line prefer-const
      let { registerUsername: username, registerPassword: password, registerCaptcha: code, roleSelect: roleId, inviteCode } = values
      roleId = Number(roleId)
      const params: RegisterParams = { username, password, code, roleId, uuid, inviteCode }
      return delay(1000).then(() => {
        register(params).then((res: RegisterRes) => {
          if (res.code == '200') {
            setLoginType('login')
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
        containerStyle={{
          backgroundColor: 'AppWorkspace',
          opacity: 0.8
        }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => {
            setLoginType(activeKey as LoginType)
            refreshCaptcha()
          }}
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
              <img onClick={refreshCaptcha} src={`data:image/jpg;base64,${captcha}`} style={{ flexGrow: 1, height: 40, padding: 2 }} alt="" />
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
                1: ' 前端',
                2: ' 后端',
                3: ' UI',
                4: ' AI',
                5: ' 安卓',
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
              <img onClick={refreshCaptcha} src={`data:image/jpg;base64,${captcha}`} style={{ flexGrow: 1, height: 40, padding: 2, border: 0 }} alt="code" />
            </div>
            <ProFormText.Password
              name="inviteCode"
              fieldProps={{
                size: "large",
                prefix: <TeamOutlined className={"prefixIcon"} />,
              }}
              placeholder={"邀请码:"}
              rules={[
                {
                  required: true,
                  message: "请输入邀请码！",
                },
              ]}
            />
          </>
        )}
      </LoginFormPage>
    </div>
  );
};

export default Login;
