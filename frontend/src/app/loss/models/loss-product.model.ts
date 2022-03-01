export interface LossProduct {
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
  implementedDate: Date | string;
  productMade: number;
}

export interface LossExpandedProduct {
  originalCode: string;
  implementedDate: Date | string;
  ceaseDate: Date | string;
  loss: number;
  totalAmountLost: number;
  totalCostLost: number;
  totalProductMade: number;
  serialNumber: Array<string>;
}
