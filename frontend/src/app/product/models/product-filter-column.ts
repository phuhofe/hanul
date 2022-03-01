import { Column } from "@app/shared/filter-table/models/column.model";

export const productColumns: Array<Column> = [
  {
    value: 'sku',
    triggerFor: [],
  },
  {
    value: 'name',
    triggerFor: [],
  },
  {
    value: 'locality',
    triggerFor: [],
  },
  {
    value: 'origin',
    triggerFor: [],
  },
  {
    value: 'meat category',
    triggerFor: [],
  },
  {
    value: 'meat',
    triggerFor: [],
  },
  {
    value: 'part category',
    triggerFor: [],
  },
  {
    value: 'part',
    triggerFor: [],
  },
  {
    value: 'grade',
    triggerFor: [],
  },
  {
    value: 'cost',
    triggerFor: [],
  },
  {
    value: 'price',
    triggerFor: [],
  }
];

export interface FilterTable {
  end_date?: string;
  product_search?: Array<string>;
  searchKey?: string;
  start_date?: string;
}
