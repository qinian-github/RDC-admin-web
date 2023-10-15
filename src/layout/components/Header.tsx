import React from "react";
import { Row, Col } from "antd";
import RightContent from "./RightContent";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { routes } from "@/config/router";
import { setBreadcrumbItems } from "@/utils/breadcrumbItems";

const HeaderComp: React.FC = () => {
  const location = useLocation();
  // 初识默认值 如果是空数组 TS 会报错
  const breadcrumbItems = [
    {
      title: (
        <>
          <HomeOutlined />
          <span style={{ marginLeft: "10px" }}>Home</span>
        </>
      ),
      href: "/",
    },
  ];
  const [secondBreadcrumb, setSecondBreadcrumb] = useState(breadcrumbItems);

  useEffect(() => {
    const path = location;
    const { children } = routes.find((item) => item.name === "menuRoutes") ?? {};

    const arr = setBreadcrumbItems(children!, path);

    setSecondBreadcrumb(arr!);
  }, [location]);


  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Breadcrumb items={secondBreadcrumb}></Breadcrumb>
      </Col>
      <Col style={{ display: "flex" }}>
        <RightContent />
      </Col>
    </Row>
  );
};

export default HeaderComp;