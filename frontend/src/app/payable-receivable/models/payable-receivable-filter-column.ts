import { Column } from "@app/shared/filter-table/models/column.model";

export const PayableColumns: Array<Column> = [
  {
    value: 'Supplier',
    triggerFor: [],
  },
  {
    value: 'Code',
    triggerFor: [],
  },
  {
    value: 'Amount Bought',
    triggerFor: [],
  },
  {
    value: 'Amount Paid',
    triggerFor: [],
  },
  {
    value: 'Total Amount Owe',
    triggerFor: [],
  },
  {
    value: 'Last Edited',
    triggerFor: [],
  },
  {
    value: 'Branch',
    triggerFor: [],
  },
  {
    value: 'Total cost',
    triggerFor: [],
  },
  {
    value: 'Branch',
    triggerFor: [],
  },
];

export const ComparativeColumns: Array<Column> = [
  {
    value: 'Total Amount Payable',
    triggerFor: [],
  },
  {
    value: 'Amount Payed',
    triggerFor: [],
  },
  {
    value: 'Amount Bought',
    triggerFor: [],
  },
  {
    value: 'Date',
    triggerFor: [],
  },
  {
    value: 'Amount Sold',
    triggerFor: [],
  },
  {
    value: 'Amount Received',
    triggerFor: [],
  },
  {
    value: 'Total Amount Received',
    triggerFor: [],
  },
  {
    value: 'Branch',
    triggerFor: [],
  },
];

export interface FilterPayableReceivableTable {
  end_date?: string;
  product_search?: Array<string>;
  searchKey?: string;
  start_date?: string;
}


