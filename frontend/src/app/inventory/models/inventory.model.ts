export interface Inventory {
  sku: string;
  supplier: string;
  date: string;
  date_bought: string;
  stock_boxes: number;
  stock_kg: number;
  serial_no: string;
  notes: string;
  stock_id: number;
  created: string;
  updated: string;
}

export interface EditInventory {
  sku?: string;
  supplier?: string;
  date?: string;
  date_bought?: string;
  stock_boxes?: number;
  stock_kg?: number;
  serial_no?: string;
  notes?: string;
  stock_id?: number;
}
