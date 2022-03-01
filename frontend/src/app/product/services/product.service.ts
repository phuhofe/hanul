import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  productEndpoint = 'logistics/products';
  $isGetProduct = new BehaviorSubject(false);

  getProduct(status: any) {
    this.$isGetProduct.next(status);
  }
  
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get(`${environment.apiNewUrl}${this.productEndpoint}`)
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  deleteProduct(sku: string) {
    return this.http.delete(
      `${environment.apiNewUrl}${this.productEndpoint}/${sku}`
    );
  }

  searchProduct(searchField: string, searchKey: string) {
    let params = new HttpParams();
    params = params.append(searchField, searchKey);

    return this.http
      .get(`${environment.apiNewUrl}${this.productEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  updateProduct(product: any) {
    return this.http.put(
      `${environment.apiNewUrl}${this.productEndpoint}`,
      product
    );
  }

  addProduct(product: any) {
    return this.http.post(
      `${environment.apiNewUrl}${this.productEndpoint}`,
      product
    );
  }

  changeProductPaging(pagingParam: any, searchString?: string) {
    let params = new HttpParams();
    params = params.append('page_size', pagingParam.pageSize);
    params = params.append('page_no', pagingParam.pageIndex);

    if (searchString) {
      params = params.append('product_search', searchString);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.productEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }

  changeProductSort(sortParam: any, searchString?: string) {
    let params = new HttpParams();
    params = params.append('sort_field', sortParam.active);

    if (sortParam.direction !== '') {
      params = params.append('sort_order', sortParam.direction);
    }
    
    if (searchString) {
      params = params.append('product_search', searchString);
    }

    return this.http
      .get(`${environment.apiNewUrl}${this.productEndpoint}`, { params })
      .pipe(
        map((res: any) => {
          return {
            tableData: res.table_data,
            totalResult: res.total_results,
          };
        })
      );
  }
}
