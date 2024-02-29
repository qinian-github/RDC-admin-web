/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import type { ActionType } from "@ant-design/pro-components";
import { ProTable, } from "@ant-design/pro-components";
import { Button } from "antd";
import AddAthlete from './AddTournament'
import { TournamentApi } from "@/api";
import { columns } from "../common/tableConfig";
import { TournamentItem } from "@/api/modules/Tournament/types";


const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


interface paramsType {
  pageSize?: number | undefined;
  current?: number | undefined;
  keyword?: string | undefined;
  name?: string | undefined;
  eventName?: string | undefined;
  stuNumber?: string | undefined;
}

const TablePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [open, setOpen] = useState(false);

  const handleDelete = (ids: Array<number>) => {
    TournamentApi.deleteTournament({ ids });
    actionRef.current?.reload();
  };

  const onCreate = (item: any) => {
    let res =[item]
    TournamentApi.addTournament(res);
    setOpen(false);
    actionRef.current?.reload();
  };

  return (
    <ProTable<TournamentItem>
      rowKey="id"
      columns={columns}
      actionRef={actionRef}
      cardBordered
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        position: ["bottomRight"],
        size: 'default',
        defaultPageSize: 10
      }}
      request={async (params: paramsType, sort, filter) => {
        console.log(params, sort, filter);
        await waitTime();
        let res: any;
        console.log(params);
        if (params.eventName) {
          res = await TournamentApi.SearchTournament(params.eventName)
          res = [res]}
         else {
          res = await TournamentApi.GetAllTournament();
        }
        // const res = await athleteApi.listAllAthlete();
        return new Promise<any>((resolve) => {
          resolve({
            data: res,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: res ? true : false,
            // 不传会使用 data 的长度，如果是分页一定要传
            // total: number,
          })
        })
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        onSave: async (_rowKey, data, origin) => {
          console.log(JSON.stringify(data) === JSON.stringify(origin));
          if (JSON.stringify(data) === JSON.stringify(origin))
            return
          else {
            delete data.index
            await TournamentApi.updateTournament(data as TournamentItem)
          }
          // actionRef.current?.cancelEditable(rowKey)
          // return Promise.reject()
        },
        onDelete: async (rowKey) => {
          console.log(rowKey);
          handleDelete(rowKey as Array<number> );
        },
        onChange: setEditableRowKeys,
      }}
      search={{
        labelWidth: "auto",
      }}
      // pagination={

      // }
      headerTitle="运动员信息"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            setOpen(true);
          }}
          type="primary"
        >
          新建
        </Button>,
        <AddAthlete
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }} />
      ]}
    />
  );
};

export default TablePage;
