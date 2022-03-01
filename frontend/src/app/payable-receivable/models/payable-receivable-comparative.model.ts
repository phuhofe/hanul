export interface PayableReceivableComparative {
  id: number;
  totalAmountPayable: number;
  amountPayed: number;
  amountBought: number;
  date: Date | string;
  amountSold: number;
  amountReceived: number;
  totalAmountReceivable: number;
  branch: string
}
