import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { StatusMap } from '@app/app.config';
import { ProductType, StatusString } from '@app/orders/models/table.enum';
import { TableHelper } from '@app/table-helper';
import { HNTableColumns } from 'src/table-columns-data';

@Component({
  selector: 'app-row-edit',
  templateUrl: './row-edit.component.html',
  styleUrls: ['./row-edit.component.css'],
})
export class RowEditComponent extends TableHelper implements OnInit {
  @Input() data: any;
  @Input() element: any;
  @Input() type!: string;

  @Output() editRow = new EventEmitter();

  StatusString = StatusString;

  orderUnitData: Array<any> = [];
  ProductType = ProductType;
  displayedColumns = HNTableColumns.OrderRowEditTableColumns;
  columnsToDisplay: string[] = this.displayedColumns.slice();

  form!: FormGroup;
  orderUnitsForm: FormArray = new FormArray([]);

  constructor(private formBuilder: FormBuilder) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.data) {
      this.orderUnitData = this.data.map((item: any) => {
        return {
          ...item,
          isEdit: false,
        };
      });
      this.dataSource = new MatTableDataSource<any>(this.orderUnitData);
      this.initData();
    }

    if (changes && this.type) {
      if (this.type !== 'mart') {
        const index = this.columnsToDisplay.indexOf('name');

        this.columnsToDisplay.splice(index, 1);

        this.columnsToDisplay.splice(
          this.columnsToDisplay.length - 1,
          0,
          'product_notes',
          'detailed_notes'
        );
      }
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      order_units: this.formBuilder.array([]),
    });

    this.orderUnitsForm = this.form.get('order_units') as FormArray;
  }

  initData() {
    this.orderUnitsForm.clear();
    this.data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushProduct(rowData);
  }

  pushProduct(rowData: any) {
    const orderUnitForm = this.formBuilder.group({
      sku: rowData?.sku ?? null,
      app_name: rowData?.app_name ?? null,
      status: rowData?.status ?? null,
      origin: rowData?.origin ?? null,
      quantity: rowData?.quantity ?? null,
      price: rowData?.price ? rowData?.price : null,
      serial_no: rowData?.serial_no ?? null,
      bl_no: rowData?.bl_no ?? null,
      product_notes: rowData?.product_notes ?? null,
      detailed_notes: rowData?.detailed_notes ?? null,
      locality: rowData?.locality ?? null,
      order_id: rowData.order_id,
      order_unit_id: rowData?.order_unit_id ?? null,
    });

    this.orderUnitsForm.push(orderUnitForm);
  }

  onSaveRow() {
    const orderUnitValue = this.form.value.order_units.map((item: any) => {
      return this.filterNullValue(item);
    });

    const editData = {
      business_no: this.element.business_no,
      order_id: this.element.order_id,
      order_no: this.element.order_no,
      status: this.element.status,
      order_units: orderUnitValue,
    };

    this.initData();
    this.editRow.emit(editData);
  }

  enter() {
    const value = this.orderUnitsForm.value;
    this.form.patchValue({
      order_units: value,
    });
    this.onSaveRow();
  }

  filterNullValue(obj: any) {
    return Object.entries(obj).reduce(
      (a: any, [k, v]) => (v === null ? a : ((a[k] = v), a)),
      {}
    );
  }

  onUpdateStatus(orderUnit: any, index: number, type: string) {
    let editOrderUint = {};

    if (type === 'complete_order') {
      editOrderUint = {
        ...orderUnit,
        status: StatusMap.COMPLETE, // 출고 준비
      };
    }

    if (type === 'future_release') {
      editOrderUint = {
        ...orderUnit,
        status: StatusMap.FUTURERELEASE,  // 추후 출고,
      };
    }

    if (type === 'new') {
      editOrderUint = {
        ...orderUnit,
        status: StatusMap.TODAY, // 당일출고,
      };
    }

    this.orderUnitsForm.at(index).patchValue(editOrderUint);
  }
}
