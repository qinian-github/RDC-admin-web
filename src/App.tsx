import React, { Suspense, lazy } from "react";
import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useSelector } from 'react-redux'
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
dayjs.locale("zh-cn");
import { theme } from "antd";
const BasicLayout = lazy(() => import("./layout/index"));

const App: React.FC = () => {
  const globalTheme = useSelector((state: any) => state.theme)
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: globalTheme.dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: globalTheme.colorPrimary,
        },
      }}
    >
      <Suspense fallback={<Spin size="large" className="globa_spin" />}>
        <BasicLayout />
      </Suspense>
    </ConfigProvider>
  );
};
export default App;