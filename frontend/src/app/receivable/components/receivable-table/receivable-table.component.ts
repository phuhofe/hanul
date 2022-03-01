import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Destroyable, takeUntilDestroyed } from '@app/core/take-until-destroy';
import { TableAction } from '@app/orders/models/table.enum';
import { ReceivableService } from '@app/receivable/services/receivable.service';

import { HNTableColumns } from 'src/table-columns-data';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Destroyable()
@Component({
  selector: 'app-receivable-table',
  templateUrl: './receivable-table.component.html',
  styleUrls: ['./receivable-table.component.css'],
})
export class ReceivableTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() searchParam: any;
  @Output() edit = new EventEmitter();
  @Output() add = new EventEmitter();

  displayedColumns = HNTableColumns.ReceivableTableColumns;
  dataSource = new MatTableDataSource();
  totalResult!: number;

  form!: FormGroup;
  receivablesForm: FormArray = new FormArray([]);
  constructor(
    private service: ReceivableService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.getReceivable();
    this.buildForm();

    this.service.updateTable$
      .pipe(takeUntilDestroyed(this))
      .subscribe((update: string) => {
        if (update === 'updated') {
          this.receivablesForm.clear();
          setTimeout(() => {
            this.getReceivable();
          }, 100);
        }
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.searchParam) {
      this.onSearch();
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      receivables: this.formBuilder.array([]),
    });

    this.receivablesForm = this.form.get('receivables') as FormArray;
  }

  initData(data: Array<any>) {
    this.receivablesForm.clear();
    data.forEach((row: any) => {
      this.addRow(row);
    });
  }

  addRow(rowData?: any) {
    this.pushProduct(rowData);
  }

  pushProduct(rowData: any) {
    const receivable = this.formBuilder.group({
      id: rowData?.id ?? null,
      row_id: rowData?.row_id ?? null,
      date: rowData?.date ?? null,
      customer: rowData?.customer ?? null,
      name: rowData?.name ?? null,
      method: rowData?.method ?? null,
      received: rowData?.received ?? null,
      discount: rowData?.discount ?? null,
      total: rowData?.total ?? null,
      bank_account: rowData?.bank_account ?? null,
      notes: rowData?.notes ?? null,
      created: rowData.created,
      updated: rowData?.updated,
    });

    this.receivablesForm.push(receivable);
  }

  getReceivable() {
    this.service.getReceivable().subscribe((data: any) => {
      if (data) {
        const source = data.tableData.map((item: any) => {
          return {
            ...item,
            isEdit: false,
          };
        });
        this.paginator.pageIndex = 0;
        this.dataSource = source;
        this.totalResult = data.totalResult;
        this.initData(data.tableData);
      }
    });
  }

  onPageChange(page: PageEvent) {
    this.service.changePage(page, this.searchParam).subscribe((data: any) => {
      if (data) {
        this.dataSource = data.tableData;
        this.totalResult = data.totalResult;
        this.initData(data.tableData);
      }
    });
  }

  sortData(sort: Sort) {
    this.service.sortData(sort, this.searchParam).subscribe((data: any) => {
      if (data) {
        this.dataSource = data.tableData;
        this.totalResult = data.totalResult;
        this.initData(data.tableData);
      }
    });
  }

  onSave(rowIndex: number) {
    const rowData = this.form.value.receivables[rowIndex];

    this.service.updateReceivable(rowData).subscribe((data: any) => {
      if (data) {
        this.openSnackbar(TableAction.EDIT);
      }
    });
  }

  onDelete(rowId: number) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.service.deleteReceivable(rowId).subscribe((data: any) => {
            if (data) {
              this.openSnackbar(TableAction.DELETE);
            }
          });
        }
      });
  }

  onAdd() {
    this.add.emit();
  }

  onEdit(rowData: any) {
    this.edit.emit(rowData);
  }

  onSearch() {
    this.service.filterReceivableByDate(this.searchParam).subscribe((data) => {
      if (data) {
        this.dataSource = data.tableData;
        this.totalResult = data.totalResult;
        this.initData(data.tableData);
      }
    });
  }

  private openSnackbar(type: any) {
    const messageMap = new Map([
      [TableAction.ADD, 'Add success'],
      [TableAction.EDIT, 'Edit  success'],
      [TableAction.DELETE, 'Delete success'],
    ]);

    const message = messageMap.get(type) ?? '';

    this.snackBar.open(message, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3500,
    });
  }
}
