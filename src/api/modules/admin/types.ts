export interface LoginParams {
  username: string,
  password: string,
  code: string,
  uuid: string
}

export interface LoginRes {
  code: number,
  data: {
    info:{
      adminId:number,
      adminRole:number,
      // 过期时间,截止时间
      exp:number,
      username:string
    },
    token:string
  },
  msg: string
}

export interface RegisterParams {
  username: string,
  password: string,
  roleId: number,
  code: string,
  uuid: string
}

export interface RegisterRes {
  code: string,
  data: string,
  msg: string
}