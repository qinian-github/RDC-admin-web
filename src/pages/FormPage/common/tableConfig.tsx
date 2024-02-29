import { ProColumns } from "@ant-design/pro-components";
import { TournamentFormItem} from "@/api/modules/Tournament/types";
export const columns: ProColumns<TournamentFormItem>[] = [
    {
        title: "ID",
        dataIndex: "id",
        hideInTable: true,
        hideInSearch: true,
    },

    {
        title: "比赛名称",
        dataIndex: "eventName",
        ellipsis: true,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    }, {
        title: "总参赛人数",
        dataIndex: "athleteNumber",
        ellipsis: true,
        search: false,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },
    {
        title: "每局比赛时长",
        dataIndex: "eventTime",
        hideInSearch: true,
        search: false,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },
    {
        title: "预赛组数",
        dataIndex: "preliminaryNumber",
        sortDirections: ['descend', "ascend"],
        search: false,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },
    {
        title: "预赛通过人数",
        hideInSearch: true,
        dataIndex: "preliminaryAccess",
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },
    {
        title: "次赛组数",
        hideInSearch: true,
        dataIndex: "quarterFinalsNumber",
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },
    {
        title: '次赛通过人数',
        dataIndex: 'quarterFinalsAccess',
        key: 'option',
        hideInSearch: true,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
  
    }, {
        title: "复赛组数",
        hideInSearch: true,
        dataIndex: "semiFinalNumber",
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },{
        title: "复赛通过人数",
        hideInSearch: true,
        dataIndex: "semiFinalAccess",
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },
     {
        title: "决赛组数",
        hideInSearch: true,
        dataIndex: "finalNumber",
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },
    {
        title: "决赛通过人数",
        hideInSearch: true,
        dataIndex: "finalAccess",
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "此项为必填项",
                },
            ],
        },
    },   {
        title: '操作',
        dataIndex: 'quarterFinalsAccess',
        key: 'option',
        valueType: 'option',
        render: (_text, record, _, action) => [
            <a
                key="editable"
                onClick={() => {
                    action?.startEditable?.(record.id);
                }}
            >
                编辑
            </a>
        ]
    }
];