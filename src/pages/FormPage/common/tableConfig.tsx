import { ProColumns } from '@ant-design/pro-components';
import {
  getCollegeName,
  getRoleName,
  getStatusName,
  getProgressName,
} from '../../../utils/getConst';
// import { TournamentFormItem } from '@/api/modules/Examine/types';
import { Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import DetailLink from '../components/DetailLink';
import {
  setModalVisible,
  setCurrentRecord,
} from '../../../stores/slices/modal';
console.log(setModalVisible);
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
    // hideInSearch: true,
    // search: false,
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
    key: 'progress',
    // hideInSearch: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    valueEnum: {
      0: { text: '未报名' },
      1: { text: '面试未预约' },
      2: { text: '面试已预约' },
      3: { text: '面试未通过' },
      4: { text: '面试通过' },
      5: { text: '一轮已预约' },
      6: { text: '一轮未通过' },
      7: { text: '一轮通过' },
      8: { text: '二轮已预约' },
      9: { text: '二轮未通过' },
      10: { text: '通过考核' },
    },
    render: (_, record) => <Space>{getStatusName(record.progress)}</Space>,
  },
  {
    title: '操作',
    dataIndex: 'progress',
    key: 'option',
    valueType: 'option',
    render: (_text, record, _, action) => [
      <DetailLink key="editable" record={record} action={action} />,
    ],
  },
];
