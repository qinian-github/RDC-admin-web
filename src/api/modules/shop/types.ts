export interface AddShopParams {
  shopId: string;
}

export interface AddShopRes {
  success: boolean;
}

export interface GetShopDetailParams {
  shopId: string;
}

export interface GetShopDetailRes {
  shopId: string;
  fans: number;
  logo: string;
}
