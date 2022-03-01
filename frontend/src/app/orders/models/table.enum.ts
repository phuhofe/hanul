export enum TableAction {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
  PUSH = 'push',
  PRINT = 'print',
}

export enum TabAction {
  ADD = 'add',
  CLOSE = 'close',
}

export enum ProductType {
  MART = 'mart',
  RESTAURANT = 'restaurant',
  BUTCHER = 'butcher',
  CUSTOM = 'custom',
}

export enum ProductStatus {
  NEW = 'new',
  TODAY = 'today',
  PROCESSING = 'processing',
  COMPLETE = 'complete',
  INCOMPLETE = 'incomplete',
  KEEP = 'keep',
}

export enum StatusString  {
  NEW = '새주문',
  TODAY = '당일출고',
  READY_TO_SHIP = '출고 준비'
};