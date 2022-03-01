export interface EditCustomer {
  owner_name?: string;
  business_name?: string;
  dob?: string;
  mobile_no?: string;
  phone_no?: string;
  owner_address?: string;
  business_address?: string;
  buyer_category?: string;
  business_type?: string;
  business_category?: string;
  status?: string;
}

export interface EditProduct {
  app_name?: string;
  category?: string;
  description?: string;
  image?: Array<string>;
  locality?: string;
  meat?: string;
  units?: Array<string>;
}

export interface AddProduct {
  app_name?: string;
  category?: string;
  description?: string;
  image?: Array<string>;
  locality?: string;
  meat?: string;
  units?: Array<string>;
}
