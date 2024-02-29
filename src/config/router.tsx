/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
// import LoginPage from "../layout/components/Login";
import App from "../App";
import { createBrowserRouter, redirect } from "react-router-dom";
import { globalConfig } from "./globalConfig";
import {
  HomeOutlined,
  EditOutlined,
  MessageOutlined,
  BarsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Permission from "@/components/Permission";
import Result404 from "@/components/NotFound";

const LoginPage = lazy(() => import("../layout/components/Login"));
const Home = lazy(() => import("../pages/Home"));
const FormPage = lazy(() => import("../pages/FormPage"));
const MessagePage = lazy(() => import("../pages/MessagePage"));
const AccountCenter = lazy(() => import("../pages/AccountPage/AccountCenter"));
const AccountSettings = lazy(() => import("../pages/AccountPage/AccountSettings"));
const DetailPage = lazy(() => import("../pages/DetailPage"));

const LazyLoad = (Component: React.LazyExoticComponent<React.FC>, code?: string) => {
  return (
    <Permission code={code}>
      <Component />
    </Permission>
  )
}

const rootLoader = async () => {
  const isLogin = localStorage.getItem(globalConfig.SESSION_LOGIN_INFO) ? true : false
  if (!isLogin) {
    return redirect('/login')
  }
  return {
    isAdmin: true,
  }
}

const routes = [
  {
    path: "/",
    id: 'root',
    element: <App />,
    loader: rootLoader,
    name: "menuRoutes",
    children: [
      {
        index: true,
        path: '/',
        title: "首页",
        icon: <HomeOutlined />,
        element: LazyLoad(Home),
      },
      {
        path: "/form",
        title: "表单页",
        icon: <EditOutlined />,
        element: LazyLoad(FormPage),
      },
      {
        path: "/table",
        title: "短信",
        icon: <MessageOutlined />,
        element: LazyLoad(MessagePage),
      },
      {
        path: "/detail",
        title: "详情页",
        icon: <BarsOutlined />,
        element: LazyLoad(DetailPage),
      },
      {
        path: "/account",
        title: "个人页",
        icon: <UserOutlined />,
        children: [
          {
            path: "/account/center",
            title: "个人中心",
            element: LazyLoad(AccountCenter),
          },
          {
            path: "/account/settings",
            title: "个人设置",
            element: LazyLoad(AccountSettings),
          },
        ],
      },
      {
        path: "*",
        element: <Result404 />
        // element: <Navigate to="/" replace={true} />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <Result404 />
    // element: <Navigate to="/" replace={true} />,
  },
];

export { routes };

const globalBorwserRouter = createBrowserRouter(routes)

export default globalBorwserRouter;