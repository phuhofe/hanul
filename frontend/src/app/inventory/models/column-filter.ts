import { Column } from "@app/shared/filter-table/models/column.model"

export const totalTableColumns: Array<Column> = [
  {
    value: 'name',
    triggerFor: [],
  },
  {
    value: 'code',
    triggerFor: [],
  },
  {
    value: 'origin',
    triggerFor: [],
  },
  {
    value: 'box',
    triggerFor: [],
  },
  {
    value: 'kg',
    triggerFor: [],
  },
  {
    value: 'total cost',
    triggerFor: ['greater than', 'less than'],
  },
  {
    value: 'branch',
    triggerFor: [],
  },
]

export const detailTableColumns: Array<Column> = [
  {
    value: 'name',
    triggerFor: [],
  },
  {
    value: 'code',
    triggerFor: [],
  },
  {
    value: 'dom/int',
    triggerFor: [],
  },
  {
    value: 'origin',
    triggerFor: [],
  },
  {
    value: 'grade',
    triggerFor: [],
  },
  {
    value: 'date',
    triggerFor: [],
  },
  {
    value: 'box',
    triggerFor: [],
  },
  {
    value: 'kg',
    triggerFor: [],
  },
  {
    value: 'cost',
    triggerFor: ['greater than', 'less than'],
  },
  {
    value: 'total cost',
    triggerFor: ['greater than', 'less than'],
  },
  {
    value: 'branch',
    triggerFor: [],
  },
  {
    value: 'serial No',
    triggerFor: [],
  },
  {
    value: 'supplier name',
    triggerFor: [],
  },
]

export const comparativeTableColumns: Array<Column> = [
  {
    value: 'name',
    triggerFor: [],
  },
  {
    value: 'code',
    triggerFor: [],
  },
  {
    value: 'dom/int',
    triggerFor: [],
  },
  {
    value: 'origin',
    triggerFor: [],
  },
  {
    value: 'dateBought',
    triggerFor: [],
  },
  {
    value: 'yesterday box-kg',
    triggerFor: [],
  },
  {
    value: 'difference box-kg',
    triggerFor: [],
  },
  {
    value: 'today box-kg',
    triggerFor: [],
  },
  {
    value: 'branch',
    triggerFor: [],
  },
 
]

export const historyTableColumns = [
  {
    value: 'name',
    triggerFor: [],
  },
  {
    value: 'code',
    triggerFor: [],
  },
  {
    value: 'dom/int',
    triggerFor: [],
  },
  {
    value: 'origin',
    triggerFor: [],
  },
  {
    value: 'grade',
    triggerFor: [],
  },
  {
    value: 'date bought',
    triggerFor: [],
  },
  {
    value: 'box',
    triggerFor: [],
  },
  {
    value: 'kg',
    triggerFor: [],
  },
  {
    value: 'cost',
    triggerFor: ['greater than', 'less than'],
  },
  {
    value: 'total cost',
    triggerFor: ['greater than', 'less than'],
  },
  {
    value: 'branch',
    triggerFor: [],
  },
  {
    value: 'serialNo',
    triggerFor: [],
  },
  {
    value: 'supplierName',
    triggerFor: [],
  },
]