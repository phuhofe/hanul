import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { InventoryPageService } from '@app/inventory/services/inventory-page.service';
import { TableHelper } from '@app/table-helper';

import { HNTableColumns } from 'src/table-columns-data';

@Destroyable()
@Component({
  selector: 'app-table-comparative',
  templateUrl: './table-comparative.component.html',
  styleUrls: ['./table-comparative.component.css'],
})
export class TableComparativeComponent extends TableHelper implements OnInit {
  @Output() totalProduct = new EventEmitter();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = HNTableColumns.InventoryComparativeTableColumns;
  form!: FormGroup;
  selectedRowIndex!: number;
  inventoryForm: FormArray = new FormArray([]);
  source: any;

  constructor(
    private inventoryService: InventoryPageService,
    private formBuilder: FormBuilder
  ) {
    super();
    this.buildForm();
  }

  ngOnInit(): void {
    this.inventoryService
      .getComparativeTableData()
      .pipe(takeUntilDestroyed(this))
      .subscribe((data: any) => {
        if (data) {
          this.source = data.tableData.map((item: any) => {
            return {
              ...item,
              isEdit: false,
            };
          });
          this.totalProduct.emit(data.totalResult);
          this.initData(this.source);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.source;
  }

  buildForm() {
    this.form = this.formBuilder.group({
      inventories: this.formBuilder.array([]),
    });

    this.inventoryForm = this.form.get('inventories') as FormArray;
  }

  initData(data: Array<any>) {
    this.inventoryForm.clear();
    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushData(rowData);
  }

  pushData(rowData: any) {
    const data = this.formBuilder.group({
      name: rowData?.name ?? '',
      code: rowData?.code ?? '',
      domInt: rowData?.dom_int ?? '',
      origin: rowData?.origin ?? '',
      dateBought: rowData?.dateBought ?? '',
      yesterdayBox: rowData?.yesterday.box ?? '',
      yesterdayKg: rowData?.yesterday.kg ?? '',
      differenceBox: rowData?.difference.box ?? '',
      differenceKg: rowData?.difference.kg ?? '',
      todayBox: rowData?.today.box ?? '',
      todayKg: rowData?.today.kg ?? '',
      branch: rowData?.branch ?? '',
    });

    this.inventoryForm.push(data);
  }

  onSaveInline(rowIndex: number) {
    const data = this.form.value.inventories[rowIndex];
  }

  sortData(sort: any) {
    const sortName = this.parseSortFn(sort.active);
    const sortType = sort.direction;
  }
  
  parseSortFn(property: any): string {
    switch (property) {
      case 'code1': {
        return this.displayedColumns[1];
      }

      case 'name1': {
        return this.displayedColumns[2];
      }
      
      case 'dom-int1': {
        return this.displayedColumns[3];
      }

      case 'origin1': {
        return this.displayedColumns[4];
      }

      case 'dateBought1': {
        return this.displayedColumns[5];
      }

      default: {
        return property;
      }
    }
  }

  pageChange(event: any){
    
  }
}
