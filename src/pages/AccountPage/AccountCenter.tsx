import { ProCard } from "@ant-design/pro-components";
import React from "react";
import { Avatar, Row, Col, Typography } from "antd";
import { useSelector } from "react-redux";
import { globalConfig } from '@/config/globalConfig'

const url = "https://img.ixintu.com/download/jpg/20200815/18ae766809ff27de6b7a942d7ea4111c_512_512.jpg!bg";

const AccountCenter: React.FC = () => {
  const userInfo = useSelector((state: any) => state.auth).info;
  const { username, adminRole } = userInfo
  console.log(userInfo);
  return (
    <ProCard wrap gutter={[0, 50]} layout="center" style={{ height: "100%" }}>
      <Row
        style={{ flexDirection: "column", alignItems: "center" }}
        gutter={[0, 20]}
      >
        <Col>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={<img src={url} alt="avatar" />}
          />
        </Col>
        <Col>
          <Typography.Title level={3}>{username}</Typography.Title>
        </Col>
        <Col>
          <Typography.Text strong>{globalConfig.ADMIN_ROLE[adminRole]}</Typography.Text>
        </Col>
        <Col>后台管理系统账号</Col>
      </Row>
    </ProCard>
  );
};

export default AccountCenter;
