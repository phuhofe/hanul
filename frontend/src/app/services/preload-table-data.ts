export const preloadTableData = {

  productData: {
    columns: [
      'sku', 'name', 'locality', 'origin', 'meat_category', 'meat', 'part_category', 'part', 'grade', 'cost', 'price'
    ],
    editable: true,
    endpoint: 'logistics/products',
    defaultSort: 'sku',
    defaultSortOrder: 'asc',
  },

  customerData: {
    columns: ['customer', 'name', 'business_no', 'owner', 'assignee', 'phone_no', 'fax_no', 'address', 'notes', 'business_type', 'business_type_detail', 'business_type_2', 'business_type_2_detail', 'credit_limit', 'action'],
    editable: true,
    endpoint: 'logistics/customers',
    defaultSort: 'customer',
    defaultSortOrder: 'asc',
  },

  cashflowData: {
    columns: ['date', 'expenses', 'returns', 'income', 'delivery_fee', 'paid', 'revenue'],
    editable: true,
    endpoint: 'logistics/cashflows',
    defaultSort: 'date',
    defaultSortOrder: 'asc',
  },

  accountData: {
    columns: ['customer', 'date', 'amount'],
    editable: true,
    endpoint: '/logistics/accounts/table_data',
    defaultSort: 'customer',
    defaultSortOrder: 'asc',
  },

  historyData: {
    columns: ['date', 'username', 'module', 'action'],
    editable: false,
    endpoint: '/logistics/history/table_data',
    defaultSort: 'date',
    defaultSortOrder: 'desc',
  },


  orderMartData: {
    columns: [
      'order_no',
      'name',
      'address',
      'orders',
      'quantity',
      'price',
      'status',
      'order_time',
      'order_update'
    ],
    editable: true,
    endpoint: 'logistics/orders',
    defaultSort: 'created',
    defaultSortOrder: 'desc',
  },

  orderCustomData: {
    columns: [
      "order_no",
      "business_no",
      "customer_name",
      "customer_address",
      "status",
      "completed",
      "created",
      "updated",
    ],
    editable: true,
    endpoint: 'logistics/orders',
    defaultSort: 'created',
    defaultSortOrder: 'desc',
  },

  managerData: {
    columns: [
      'business_no', 'owner_name', 'business_name', 
      'dob', 'email', 'mobile_no',
      'phone_no', 'owner_address', 'business_address', 
      'buyer_category', 'business_type', 'business_category', 
      'business_certificate', 'status', 'created', 'updated'],
    editable: true,
    endpoint: 'logistics/customers/mobile',
    defaultSort: 'business_no',
    defaultSortOrder: 'asc',
  },

  inventoryData: {
    columns: [
      'sku', 'supplier', 'date', 
      'date_bought', 'stock_boxes', 'stock_kg',
      'serial_no', 'notes', 'created', 'updated'],
    editable: true,
    endpoint: 'logistics/inventory',
    defaultSort: 'sku',
    defaultSortOrder: 'asc',
  },

}