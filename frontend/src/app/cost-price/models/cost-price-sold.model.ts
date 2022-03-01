export interface CostPriceSold {
  id: number;
  serialCode: string;
  code: string;
  name: string;
  origin: string;
  box: number;
  kg: string;
  q: number;
  unitPrice: number;
  totalPrice: number;
  branch: string;
  date: Date | string;
  customer: string;
  receivable: number;
  tax: string;
  category: string;
}

export interface CostPriceExpandedSold {
  id: number;
  serialCode: string;
  code: string;
  name: string;
  origin: string;
  box: number;
  kg: string;
  q: number;
  unitPrice: number;
  totalPrice: number;
  branch: string;
  date: Date | string;
  customer: string;
  receivable: number;
  tax: string;
  category: string;
}
