import React, { ChangeEvent } from "react";
import { Avatar, Dropdown, MenuProps, Button, Input, Space, message } from "antd";
import { SkinOutlined } from "@ant-design/icons";
import { debounce } from "../../utils/func";
import styles from "../index.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setColorPrimary, setDark } from "../../stores/slices/theme";
import { createFromIconfontCN } from '@ant-design/icons';
import { removeUserInfo } from "@/stores/slices/auth";

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4280892_pybmn8s64a.js',
});

const RightContent: React.FC = () => {
  const globalTheme = useSelector((state: any) => state.theme);
  const dispatch = useDispatch()

  const navigateTo = useNavigate()
  const logoutHandle = () => {
    message.success("成功退出登录")
    dispatch(removeUserInfo({}))
    navigateTo("/login", { replace: false });
  };
  const centerHandle = () => {
    navigateTo('/account/center')
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={centerHandle}>个人中心</span>,
    },
    {
      key: "2",
      label: <span onClick={logoutHandle}>退出登录</span>,
    },
  ];

  const changeMainColor = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setColorPrimary(e.target.value))
  };

  return (
    <Space size={24}>
      <span style={{ display: "flex" }}>
        {/* <Badge count={12}>
          <BellOutlined style={{ fontSize: 24, cursor: 'pointer' }} />
        </Badge> */}
      </span>
      {globalTheme.dark ? (
        <Button
          icon={<IconFont type="icon-yueliang" />}
          shape="circle"
          onClick={() => {
            dispatch(setDark(false))
          }}
        ></Button>
      ) : (
        <Button
          icon={<IconFont type="icon-sun" />}
          shape="circle"
          onClick={() => {
            dispatch(setDark(true))
          }}
        ></Button>
      )}
      <div className={styles.skin}>
        <Button type="primary" shape="circle" icon={<SkinOutlined />} />
        <Input
          type="color"
          className={styles.skin_input}
          defaultValue={globalTheme.colorPrimary}
          onChange={debounce(changeMainColor, 500)}
        ></Input>
      </div>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Avatar
          src="https://img.ixintu.com/download/jpg/20200815/18ae766809ff27de6b7a942d7ea4111c_512_512.jpg!bg"
          style={{ cursor: "pointer" }}
        />
      </Dropdown>
    </Space>
  );
};

export default RightContent;