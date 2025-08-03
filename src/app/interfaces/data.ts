export interface IMainData {
  headers: Array<string>,
  priceTotal: Array<string>,
  packQuantityTotal: Array<string>,
  data: Array<IData>,
}

export interface IData {
  id: string;
  expanded: boolean;
  product: string;
  country: string;
  type: string;
  amount: string;
  packQuantity: {
    [key: string]: string
  };
  price: {
    [key: string]: string
  };
}
