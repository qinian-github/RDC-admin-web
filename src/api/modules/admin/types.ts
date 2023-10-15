export interface LoginParams {
  username: string,
  password: string,
  code: string,
  uuid: string
}

export interface LoginRes {
  code: string,
  data: string,
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