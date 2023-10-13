import { useState } from "react";
import { StatisticCard } from "@ant-design/pro-components";
import RcResizeObserver from "rc-resize-observer";
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4280892_pybmn8s64a.js',
});

const DemoCard = () => {
  const [responsive, setResponsive] = useState(false);
  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? "column" : "row"}>
        <StatisticCard
          statistic={{
            title: "前端",
            value: 0,
            icon: (<IconFont type="icon-React" style={{fontSize:40}}/>),
          }}
        />
        <StatisticCard
          statistic={{
            title: "后台",
            value: 0,
            icon: (<IconFont type="icon-java" style={{fontSize:40}}/>),
          }}
        />
        <StatisticCard
          statistic={{
            title: "安卓",
            value: 0,
            icon: (<IconFont type="icon-Android" style={{fontSize:40}}/>),
          }}
        />
        <StatisticCard
          statistic={{
            title: "AI",
            value: 0,
            icon: (<IconFont type="icon-ai" style={{fontSize:40}}/>),
          }}
        />
        <StatisticCard
          statistic={{
            title: "UI",
            value: 0,
            icon: (<IconFont type="icon-uicn" style={{fontSize:40}}/>),
          }}
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};

export default DemoCard;
