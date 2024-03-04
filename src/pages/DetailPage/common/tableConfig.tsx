import { ProColumns } from '@ant-design/pro-components';
import {
  getCollegeName,
  getRoleName,
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
    dataIndex: 'reservationId',
    hideInTable: true,
    hideInSearch: true,
  },

  {
    title: '考核阶段',
    dataIndex: 'progress',
    key: 'progress',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    valueEnum: {
      1: { text: '面试' },
      4: { text: '一轮' },
      7: { text: '二轮' },
    },
    render: (_, record) => <Space>{getProgressName(record.progress)}</Space>,
  },
  {
    title: '预约组别方向',
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
    title: '可预约人数',
    dataIndex: 'remain',
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
  },

  {
    title: '开始时间',
    dataIndex: 'fromTime',
    key: 'date',
    sortDirections: ['descend', 'ascend'],
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    fieldProps: {
      type: 'date',
      format: 'YYYY-MM-DD',
      initialValue: '2021-01-01',
    },
  },

  {
    title: '结束时间',
    hideInSearch: true,
    dataIndex: 'toTime',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    // render: (_, record) => <Space>{getCollegeName(record.college)}</Space>,
  },

  // {
  //   title: '操作',
  //   dataIndex: 'progress',
  //   key: 'option',
  //   valueType: 'option',
  //   render: (_text, record, _, action) => [
  //     <DetailLink key="editable" record={record} action={action} />,
  //   ],
  // },
];
