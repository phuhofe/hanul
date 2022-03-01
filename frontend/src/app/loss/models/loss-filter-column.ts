import { Column } from "@app/shared/filter-table/models/column.model";

export const lossDetailColumns: Array<Column> = [
  {
    value: 'original',
    triggerFor: ['code', 'name', 'origin'],
  },
  {
    value: 'product',
    triggerFor: ['code', 'name', 'origin'],
  },
  {
    value: 'lost %',
    triggerFor: [],
  },
  {
    value: 'branch',
    triggerFor: [],
  },
  {
    value: 'amount lost',
    triggerFor: [],
  }
];

export interface FilterTable {
  end_date?: string;
  product_search?: Array<string>;
  searchKey?: string;
  start_date?: string;
}
