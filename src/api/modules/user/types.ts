export interface LoginParams {
  name: string;
  password: string;
}

export interface LoginRes {
  success: boolean;
}

export interface UserInfoParams {
  userId: string;
}

export interface UserInfoRes {
  userId: string;
  usename: string;
  age: number;
}
