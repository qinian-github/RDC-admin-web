import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export type OnFulfilled<V> = ((value: V) => V | Promise<V>) | null;
export type OnRejected = ((error: any) => any) | null;

export type RequestInterceptor = {
  onFulfilled: OnFulfilled<AxiosRequestConfig>;
  onRejected?: OnRejected;
};

export type ResponseInterceptor = {
  onFulfilled: OnFulfilled<AxiosResponse>;
  onRejected?: OnRejected;
};
