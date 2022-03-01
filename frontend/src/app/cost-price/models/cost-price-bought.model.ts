export interface CostPriceBought {
  id: number;
  serialCode: string;
  code: string;
  name: string;
  origin: string;
  box: number;
  kg: string;
  q: number;
  unitCost: number;
  totalCost: number;
  branch: string;
  date: Date | string;
  supplier: string;
  amountOwe: number;
  tax: string;
  category: string;
}


export interface CostPriceExpandedBought {
  id: number;
  serialCode: string;
  code: string;
  name: string;
  origin: string;
  box: number;
  kg: string;
  q: number;
  unitCost: number;
  totalCost: number;
  branch: string;
  date: Date | string;
  supplier: string;
  amountOwe: number;
  tax: string;
  category: string;
}
