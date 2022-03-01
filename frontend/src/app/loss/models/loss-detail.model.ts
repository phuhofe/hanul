export interface LossDetail {
  id: number;
  original: {
    code: string;
    name: string;
    origin: string;
  };
  product: {
    code: string;
    name: string;
    origin: string;
  };
  loss: number;
  branch: string;
  amountLost: number;
  implementedDate: Date;
  productMade: number;
}

export interface LossExpandedDetail {
  implementedDate: Date | string;
  ceaseDate: Date | string;
  loss: number;
  totalAmountLost: number;
  totalCost: number;
  totalProductMade: number;
  serialNumber: Array<string>;
}
