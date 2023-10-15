import React, { useState, Suspense } from "react";
import {
  Outlet,
  useNavigate,
  NonIndexRouteObject,
  useLocation,
} from "react-router-dom";
import { MenuProps } from "antd";
import { Layout, Menu, theme, Spin } from "antd";
import HeaderComp from "./components/Header";
import { routes } from "../config/router";
import "antd/dist/reset.css";
import { createFromIconfontCN } from '@ant-design/icons';
import { getCaptcha } from "@/api/modules/base";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4280892_pybmn8s64a.js',
});

type RouteType = NonIndexRouteObject & {
  title: string;
  icon: React.ReactElement;
};

const { Header, Content, Footer, Sider } = Layout;

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handle = () => {
    getCaptcha().then(res=>{
      console.log(res);
      
    })
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getItems: any = (children: RouteType[]) => {
    return children.map((item) => {
      return {
        key: item.index
          ? "/"
          : item.path?.startsWith("/")
            ? item.path
            : `/${item.path}`,
        icon: item.icon,
        label: item.title,
        children: item.children ? getItems(item.children) : null,
      };
    });
  };

  const menuItems: MenuProps["items"] = getItems(
    routes[0].children!.filter((item) => item.path !== "*")
  );

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    navigate(key);
  };

  const renderOpenKeys = () => {
    const arr = pathname.split("/").slice(0, -1);
    const result = arr.map(
      (_, index) => "/" + arr.slice(1, index + 1).join("/")
    );
    return result;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        theme="light"
        style={{
          overflow: "auto",
          height: "100vh",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: 'center',
            height: 32,
            margin: 16,
          }}
        ><IconFont type="icon-React" style={{ fontSize: 40 }} rotate={180} spin={true} /></div>
        <Menu
          theme="light"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={renderOpenKeys()}
          mode="inline"
          items={menuItems}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: "0 10px", marginLeft: 16, background: colorBgContainer }}>
          <HeaderComp />
        </Header>
        {/* height：Header和Footer的默认高度是64 */}
        <Content
          style={{
            padding: 16,
            overflow: "auto",
            height: `calc(100vh - 128px)`,
          }}
        >
          <Suspense fallback={<Spin size="large" className="content_spin" />}>
            <button onClick={handle}>click</button>
            <Outlet />
          </Suspense>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          RDC Admin Web ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
