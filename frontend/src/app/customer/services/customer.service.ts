import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '@environments/environment';

@Injectable()
export class CustomerService {
  customerEndpoint = 'logistics/customers';
  customerMap = new Map([
    ['customer', 'customer_code'],
    ['name', 'customer_code'],
    ['business_no', 'business_no'],
    ['owner', 'owner_name'],
    ['assignee', 'assignee'],
    ['phone_no', 'phone_no'],
    ['fax_no', 'fax_no'],
    ['address', 'business_address'],
    ['notes', 'notes'],
    ['business_type', 'business_type'],
    ['business_type_detail', 'business_category'],
    ['business_type_2', 'business_type'],
    ['business_type_2_detail', 'business_category'],
    ['credit_limit', 'customer_code'],
  ]);

  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http
      .get(`${environment.apiNewUrl}${this.customerEndpoint}`)
      .pipe(
        map((res: any) => {
          return {
            tableData: this.mapData(res.table_data),
            totalResult: res.total_results,
          };
        })
      );
  }

  searchCustomers(searchField: string, searchKey: string) {
    let params = new HttpParams();
    params = params.append(searchField, searchKey);

    return this.http
      .get(`${environment.apiNewUrl}${this.customerEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          console.log(res);
          
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  updateCustomers(data: any) {
    const reverseData = this.reverseData(data);
    return this.http
      .put(`${environment.apiNewUrl}${this.customerEndpoint}`, reverseData)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  addCustomers(data: any) {
    const data1 = {
      customer_code: '123456789',
      business_no: '123-456-789',
      business_name: 'Example Business',
      owner_name: 'John Doe',
      dob: '2000-01-01',
      email: 'john_doe@gmail.com',
      mobile_no: '010-1234-5678',
      phone_no: '070-1234-5678',
      owner_address: '123 Test Lane',
      business_address: '123 Business Lane',
      business_type: 'test_type',
      business_category: 'test_category',
      customer_type: 'test_type',
      customer_category: 'mart',
    };

    return this.http
      .post(`${environment.apiNewUrl}${this.customerEndpoint}`, data1)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteCustomers(rowId: number) {
    return this.http
      .delete(`${environment.apiNewUrl}${this.customerEndpoint}/${rowId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  changePage(page: PageEvent, searchKey?: string) {
    let params = new HttpParams();
    params = params.append('page_size', page.pageSize);
    params = params.append('page_no', page.pageIndex);

    if (searchKey) {
      params = params.append('customer_search', searchKey);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.customerEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  sortData(sort: Sort, searchKey?: string) {
    const sortField = this.customerMap.get(sort.active.toString());
    let params = new HttpParams();
    params = params.append('sort_field', sort.active);
    params = params.append('sort_asc', sort.direction === 'asc');

    if (searchKey) {
      params = params.append('customer_search', searchKey);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.customerEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  filterList(field: string) {
    let params = new HttpParams();
    params = params.append('field', field);

    return this.http.get(
      `${environment.apiNewUrl}${this.customerEndpoint}/filters/lists`,
      {
        params,
      }
    );
  }

  getCustomerFilter() {
    return this.http.get(
      `${environment.apiNewUrl}${this.customerEndpoint}/filters`
    );
  }

  private mapData(customerData: any) {
    return customerData.map((customer: any) => {
      return {
        customer_code: customer.customer_code,
        business_no: customer.business_no,
        business_name: customer.business_name,
        owner_name: customer.owner_name,
        dob: customer.dob,
        email: customer.email,
        assignee: customer.assignee,
        mobile_no: customer.mobile_no,
        phone_no: customer.phone_no,
        fax_no: customer.fax_no,
        owner_address: customer.owner_address,
        business_address: customer.business_address,
        notes: customer.notes,
        business_type: customer.business_type,
        business_category: customer.business_category,
        customer_type: customer.customer_type,
        customer_category: customer.customer_category,
        customer_status: customer.customer_status,
        created: customer.created,
        updated: customer.updated,
      };
    });
  }

  private reverseData(customer: any) {
    return {
      customer_code: customer.customer_code,
      business_no: customer.business_no,
      business_name: customer.business_name,
      owner_name: customer.owner_name,
      dob: customer.dob ?? null,
      email: customer.email,
      assignee: customer.assignee,
      mobile_no: customer.mobile_no,
      phone_no: customer.phone_no,
      fax_no: customer.fax_no,
      owner_address: customer.owner_address,
      business_address: customer.business_address,
      notes: customer.notes,
      business_type: customer.business_type,
      business_category: customer.business_category,
      customer_type: customer.customer_type,
      customer_category: customer.customer_category,
      customer_status: customer.customer_status,
    };
  }
}
