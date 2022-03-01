import { Column } from "@app/shared/filter-table/models/column.model";
import { SortByTypesBought, SortByTypesSold } from "./cost-price-table-type.enum";

export const sortByTypesBought = [
  {
    name: SortByTypesBought.SUPPLIER,
    value: SortByTypesBought.SUPPLIER,
  },
  {
    name: SortByTypesBought.PRODUCT,
    value: SortByTypesBought.PRODUCT,
  },
];

export const sortByTypesSold = [
  {
    name: SortByTypesSold.CUSTOMER,
    value: SortByTypesSold.CUSTOMER,
  },
  {
    name: SortByTypesSold.PRODUCT,
    value: SortByTypesSold.PRODUCT,
  },
];

export const CostPriceBoughtColumns: Array<Column> = [
  {
    value: 'Code',
    triggerFor: [],
  },
  {
    value: 'Name',
    triggerFor: [],
  },
  {
    value: 'Origin',
    triggerFor: [],
  },
  {
    value: 'Box',
    triggerFor: [],
  },
  {
    value: 'kg',
    triggerFor: [],
  },
  {
    value: 'Q',
    triggerFor: [],
  },
  {
    value: 'Unit cost',
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
  {
    value: 'Supplier',
    triggerFor: [],
  },
  {
    value: 'Amount owe',
    triggerFor: [],
  },
  {
    value: 'Tax',
    triggerFor: [],
  },
  {
    value: 'Category',
    triggerFor: [],
  },
];

export interface FilterCostPriceTable {
  end_date?: string;
  product_search?: Array<string>;
  searchKey?: string;
  start_date?: string;
}
