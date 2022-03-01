export interface LossOriginal {
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
  amountLoss: number;
  implementedDate: Date | string;
  productMade: number;
}

export interface LossExpandedOriginal {
  productCode: string;
  implementedDate: Date | string;
  ceaseDate: Date | string;
  loss: number;
  totalAmountLost: number;
  totalCostLost: number;
  totalProductMade: number;
  serialNumber: Array<string>;
}