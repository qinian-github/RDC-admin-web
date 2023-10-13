import { shopInstance } from '@/apis';
import {
  AddShopParams,
  AddShopRes,
  GetShopDetailParams,
  GetShopDetailRes,
} from './types';

const { post: shopPost, get: shopGet } = shopInstance;

const addShop = (params: AddShopParams) => {
  return shopPost<AddShopRes>('/addShop', params);
};

const getShopDetail = (params: GetShopDetailParams) => {
  return shopGet<GetShopDetailRes>('/shopDetail', { params });
};

export { addShop, getShopDetail };
