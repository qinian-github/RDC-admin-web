export interface LoginParams {
  username: string,
  password: string,
  code: string,
  uuid: string
}

export interface LoginRes {
  success: boolean;
}

export interface RegisterParams {
  username: string,
  password: string,
  roleId: number,
  code: string,
  uuid: string
}

export interface RegisterRes {
  success: boolean;
}