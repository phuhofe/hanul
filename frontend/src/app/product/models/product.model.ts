export interface Product {
  sku: string,
  name: string,
  locality: string,
  origin: string,
  meat_category: string,
  meat: string,
  part_category: string,
  part: string,
  grade: string,
  cost: number,
  price: number,
  app_name: string,
  image?: string
}

export interface EditProduct {
  sku?: string,
  name?: string,
  locality?: string,
  origin?: string,
  meat_category?: string,
  meat?: string,
  part_category?: string,
  part?: string,
  grade?: string,
  cost?: number,
  price?: number,
  app_name?: string,
}