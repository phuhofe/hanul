import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { TableAction } from '@app/orders/models/table.enum';
import { ProductTableType } from '@app/product/models/product-table-type.enum';
import { productColumns } from '@app/product/models/product-filter-column';

import { HNTableColumns } from 'src/table-columns-data';

import { ProductService } from '../../services/product.service';
import { ConfirmDeleteProductComponent } from '../../components/confirm-delete-product/confirm-delete-product.component';
@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() search: any;
  @Output() totalProduct = new EventEmitter();
  @Output() editProductTab = new EventEmitter();

  endpoint!: string;
  defaultSort!: string;
  defaultSortOrder!: string;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  columnsToDisplay = HNTableColumns.ProductTableColumns;
  pageName!: string;
  totalResult: number = 0;
  form!: FormGroup;
  productsForm: FormArray = new FormArray([]);

  productTabsTitle = 'product-tabs';
  selectedProductIndex = 0;
  selectedSku!: string;
  searchString!: string;

  ProductTableType = ProductTableType;
  tableTypes = [
    {
      name: ProductTableType.PRODUCT,
      value: ProductTableType.PRODUCT,
      color: '',
    },

    {
      name: ProductTableType.DETAIL,
      value: ProductTableType.DETAIL,
    },

    {
      name: ProductTableType.ORIGINAL,
      value: ProductTableType.ORIGINAL,
      color: '',
    },
  ];

  columnData = productColumns;
  clearAll = false;

  filterArray: Array<string> = [];
  selectedTable!: ProductTableType | null;
  source: any;
  
  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.search) {
      if (this.search) {
        this.searchProduct();
      } else {
        this.getProducts();
      }
    }
  }

  ngOnInit() {
    this.getProducts();
    this.productService.$isGetProduct.subscribe((status: boolean) => {
      if (status) {
        this.getProducts();
      }
    });
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.dataSource.paginator = this.paginator;
  //     // this.applySortingDataAccessor();
  //     this.dataSource.data = this.source;
  //     this.totalProduct.emit(this.source.length);
  //   });
  // }

  onEditProductTab(event: any) {
    this.editProductTab.emit(event);
  }

  addTab(tabName: string, data: any, action: string) {
    // const tabData = {
    //   action: action,
    //   label: tabName,
    //   isUpdating: false,
    //   index: this.tabs ? this.tabs.length : 0,
    //   data: data ? data : {},
    // };
    // this.tabs.push(tabData);
    // this.selected.setValue(this.tabs.length);
    // this.saveToLocalStorage();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      products: this.formBuilder.array([]),
    });

    this.productsForm = this.form.get('products') as FormArray;
  }

  initData(data: any) {
    this.productsForm.clear();
    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushProduct(rowData);
  }

  pushProduct(rowData: any) {
    const lessonForm = this.formBuilder.group({
      sku: rowData.sku ?? '',
      name: rowData.name ?? '',
      locality: rowData.locality ?? '',
      origin: rowData.origin ?? '',
      meat_category: rowData.meat_category ?? '',
      meat: rowData.meat ?? '',
      part_category: rowData.part_category ?? '',
      part: rowData.part ?? '',
      grade: rowData.grade ?? '',
      cost: rowData.cost ?? '',
      price: rowData.price ?? '',
      isEdit: false,
    });

    this.productsForm.push(lessonForm);
  }

  getProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.dataSource = new MatTableDataSource<any>(data.tableData);
      this.totalResult = data.totalResult;
      this.paginator.pageIndex = 0;
      this.initData(data.tableData);
      this.totalProduct.emit(this.totalResult);
    });
  }

  searchProduct() {
    this.productService
      .searchProduct(this.search.field, this.search.value[0])
      .subscribe((data) => {
        if (data) {
          const source = data.tableData.map((item: any) => {
            return {
              ...item,
              isEdit: false,
            };
          });

          this.setupData({
            tableData: source,
            totalResult: data.totalResult,
          });
        }
      });
  }

  private setupData(data: { tableData: any; totalResult: number }) {
    this.dataSource = data.tableData;
    this.totalResult = data.totalResult;
    this.initData(data.tableData);
  }

  editInline(product: any) {}

  addRowData(rowObj: any) {
    const addData = this.convertRowObject(rowObj);

    this.productService
      .addProduct(addData)
      .pipe()
      .subscribe(() => {
        this.getProducts();
      });
  }

  updateRowData(sku: any) {
    const data = this.form.value.products.find((item: any) => item.sku === sku);
    this.productService
      .updateProduct(data)
      .pipe()
      .subscribe((data: any) => {
        if (data) {
          this.getProducts();
          this.openSnackbar(TableAction.EDIT);
        }
      });
  }

  deleteRowData(rowObj: any) {
    this.dialog
      .open(ConfirmDeleteProductComponent, {
        width: '350px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.productService.deleteProduct(rowObj.sku).subscribe(() => {
            this.getProducts();
          });
        }
      });
  }

  pageChange($event: any) {
    this.productService
      .changeProductPaging($event, this.searchString)
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource<any>(data.tableData);
        this.totalResult = data.totalResult;
        this.initData(data.tableData);
      });
  }

  sortData($event: any) {
    this.productService
      .changeProductSort($event, this.searchString)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>(data.tableData);
        this.totalResult = data.totalResult;
        this.initData(data.tableData);
      });
  }

  convertRowObject(rowObject: any) {
    return {
      sku: rowObject?.sku,
      name: rowObject.name,
      locality: rowObject.locality,
      origin: rowObject.origin,
      meat_category: rowObject.meat_category,
      meat: rowObject.meat,
      part_category: rowObject.part_category,
      part: rowObject.part,
      grade: rowObject.grade,
      cost: rowObject.cost,
      price: rowObject.price,
    };
  }

  private openSnackbar(type: any) {
    const messageMap = new Map([
      [TableAction.ADD, 'Add product success'],
      [TableAction.EDIT, 'Edit product success'],
      [TableAction.DELETE, 'Delete product success'],
    ]);

    const message = messageMap.get(type) ?? '';

    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3500,
    });
  }
}
