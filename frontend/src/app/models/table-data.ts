export interface Data {
    created: Date;
    updated: Date;
}

export interface Product extends Data {
    sku: string;
    name: string;
    locality: string;
    origin: string;
    meat_category: string;
    meat: string;
    part_category: string;
    part: string;
    grade: string;
    cost: number;
    price: number;
}

export interface Customer extends Data {
    customer: string;
    name: string;
    business_no: string;
    owner: string;
    assignee: string;
    phone_no: string;
    fax_no: number;
    address: number;
    notes: string;
    business_type: string;
    business_type_detail: string;
    business_type_2: string;
    business_type_2_detail: string;
    credit_limit: number;
}

export interface CashFlow extends Data {
    date: Date;
    expenses: number;
    returns: number;
    income: number;
    delivery_fee: number;
    paid: number;
    revenue: number;
}

export interface Account extends Data {
    customer: string;
    date: Date;
    amount: number;
}

export interface History extends Data {
    date: Date;
    username: string;
    module: string;
    action: string;
}

export interface Order extends Data {
    app_name: string;
    origin: string;
    quantity: number;
    price: number;
    serial_no: string;
}
