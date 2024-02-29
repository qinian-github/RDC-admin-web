/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, { useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import Updataprogress from './Updataprogress';
import { ExamineApi } from '@/api';
import { columns } from '../common/tableConfig';
import { TournamentItem } from '@/api/modules/Examine/types';

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
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [currentRecord, setCurrentRecord] = useState(null);
  // 在 MyTable 组件内部
  const handleBatchOperation = () => {
    // 在这里，你可以访问到选中的行
    console.log(selectedRows);
    // 你可以遍历选中的行并进行处理
    selectedRows.forEach((row) => {
      // 对每一行进行你需要的操作
      console.log(row);
    });

    // 如果你需要将选中的行发送到服务器，你可以在这里发送请求
    // 例如，使用 axios 或 fetch
  };
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: (keys: any, rows: any) => {
      setSelectedKeys(keys);
      setSelectedRows(rows);
      console.log(`selectedRowKeys: ${keys}`, 'selectedRows: ', rows);
    },
  };
  // 新建运动员
  const onCreate = () => {
    // athleteApi.addAthlete(item);

    setOpen(false);
    actionRef.current?.reload();
  };
  return (
    <div>
      <ProTable<any>
        rowKey="userId"
        columns={columns as any}
        actionRef={actionRef}
        cardBordered
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          position: ['bottomRight'],
          size: 'default',
          defaultPageSize: 10,
        }}
        rowSelection={rowSelection}
        request={async (params: paramsType, sort, filter) => {
          console.log(params, sort, filter);
          await waitTime();
          let res: any;
          console.log(params);
          if (params.eventName) {
            res = await ExamineApi.GetUserInfo(params.eventName);
            res = [res];
          } else {
            res = await ExamineApi.GetUserInfo({
              pageSize: params.pageSize,
              pageIndex: params.current,
            }).then((res: any) => {
              res = res.data.records;
              console.log(res);
              return res;
            });
            console.log(res);
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
            });
          });
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (_rowKey, data, origin) => {
            console.log(JSON.stringify(data) === JSON.stringify(origin));
            if (JSON.stringify(data) === JSON.stringify(origin)) return;
            else {
              delete data.index;
              await ExamineApi.updateTournament(data as TournamentItem);
            }
            // actionRef.current?.cancelEditable(rowKey)
            // return Promise.reject()
          },
          onDelete: async (rowKey) => {
            console.log(rowKey);
            // handleDelete(rowKey as Array<number>);
          },
          onChange: setEditableRowKeys,
        }}
        search={{
          labelWidth: 'auto',
        }}
        // pagination={

        // }
        headerTitle="运动员信息"
        toolBarRender={() => [
          <Button
            onClick={() => {
              console.log(selectedKeys);
              if (selectedKeys.length === 0) {
                message.warning('没有选中任何行');
                return;
              }
              setOpen(true);
            }}
          >
            批量操作
          </Button>,
          <Updataprogress
            open={open}
            onCreate={onCreate}
            onCancel={() => {
              setOpen(false);
            }}
            selectedKeys={selectedKeys}
            selectedRows={selectedRows}
          />,
        ]}
      />
    </div>
  );
};

export default TablePage;
