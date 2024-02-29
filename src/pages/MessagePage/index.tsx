import { messageApi } from "@/api";
import React from "react";

const messagePage: React.FC = () => {
  console.log(messageApi.getRecord({
    progress: 4,
    pageIndex: 1,
    pageSize: 10
  }));

  return (
    <></>
  );
};

export default messagePage;
