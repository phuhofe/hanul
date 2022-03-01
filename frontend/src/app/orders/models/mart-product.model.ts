export interface MartProduct {
  order_id: string,
  order_no: number,
  date: string,
  customer: string,
  type: string,
  sku: string,
  origin: string,
  quantity: string,
  price: number,
  serial_no: string,
  status: string,
  created: string,
  updated: string
}

export const allTypesOrder = [
  {
    value: 'mart',
    label: 'Mart'
  },
  {
    value: 'restaurant',
    label: 'Restaurant'
  },
  {
    value: 'butcher',
    label: 'Butcher'
  },
];

export interface EditOrder {
  order_id: number,
  order_no?: string,
  status?: string,
  completed?: string,
  order_units?: any,
  deleted_order_units?: any,
  added_order_units?:any;
}



