/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import LoginPage from "../layout/components/Login";
import App from "../App";
import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import { globalConfig } from "./globalConfig";
import {
  HomeOutlined,
  EditOutlined,
  TableOutlined,
  BarsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Permission from "@/components/Permission";

const Home = lazy(() => import("../pages/Home"));
const FormPage = lazy(() => import("../pages/FormPage"));
const TablePage = lazy(() => import("../pages/TablePage"));
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
        title: "列表页",
        icon: <TableOutlined />,
        element: LazyLoad(TablePage),
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
        element: <Navigate to="/" replace={true} />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export { routes };

const globalBorwserRouter = createBrowserRouter(routes)

export default globalBorwserRouter;