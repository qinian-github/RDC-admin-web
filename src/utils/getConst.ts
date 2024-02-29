const colleges = [
  '计算机学院',
  '信息工程学院',
  '自动化学院',
  '集成电路学院',
  '机电工程学院',
  '物理与光电工程学院',
  '轻工化工学院',
  '环境科学与工程学院',
  '材料与能源学院',
  '生物医药学院',
  '生态环境与资源学院',
  '土木与交通工程学院',
  '外国语学院',
];
const statuses = [
  '未报名',
  '面试未预约/查面试预约情况',
  '面试已预约',
  '面试未通过',
  '一轮未预约/查一轮预约情况',
  '一轮已预约',
  '一轮未通过',
  '二轮未预约/查二轮预约情况',
  '二轮已预约',
  '二轮未通过',
  '通过考核',
];
const roles = ['前端', '后台', 'UI', 'AI', '安卓'];
export function getCollegeName(index: any) {
  if (index >= 1 && index <= colleges.length) {
    return colleges[index - 1];
  } else {
    return 'Invalid index';
  }
}

export function getRoleName(index: any) {
  if (index >= 1 && index <= roles.length) {
    return roles[index - 1];
  } else {
    return 'Invalid index';
  }
}

export function getStatusName(index: any) {
  if (index >= 0 && index < statuses.length) {
    return statuses[index];
  } else {
    return 'Invalid index';
  }
}
