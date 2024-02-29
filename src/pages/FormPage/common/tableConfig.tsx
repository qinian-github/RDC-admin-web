import { ProColumns } from '@ant-design/pro-components';
import {
  getCollegeName,
  getRoleName,
  getStatusName,
} from '../../../utils/getConst';
// import { TournamentFormItem } from '@/api/modules/Examine/types';
import { Space } from 'antd';
export const columns: ProColumns[] = [
  {
    title: 'ID',
    dataIndex: 'userId',
    hideInTable: true,
    hideInSearch: true,
  },

  {
    title: '姓名',
    dataIndex: 'realName',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '性别',
    dataIndex: 'sex',
    hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },

    onFilter: true,
    render: (_, record) => <Space>{record.sex == '0' ? '男' : '女'}</Space>,
  },
  {
    title: '学号',
    dataIndex: 'schoolNumber',
    hideInSearch: true,
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '手机号',
    dataIndex: 'phoneNumber',
    sortDirections: ['descend', 'ascend'],
    search: false,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '学院',
    hideInSearch: true,
    dataIndex: 'college',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (_, record) => <Space>{getCollegeName(record.college)}</Space>,
  },
  {
    title: '考核组别方向',
    hideInSearch: true,
    dataIndex: 'groupType',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (_, record) => <Space>{getRoleName(record.groupType)}</Space>,
  },
  {
    title: '考核进度',
    dataIndex: 'progress',
    key: 'option',
    hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    render: (_, record) => <Space>{getStatusName(record.progress)}</Space>,
  },
  {
    title: '操作',
    dataIndex: 'progress',
    key: 'option',
    valueType: 'option',
    render: (_text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        详情
      </a>,
    ],
  },
];
