import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableHelper } from '@app/table-helper';
import { HNTableColumns } from 'src/table-columns-data';

@Component({
  selector: 'app-customer-expanded-table',
  templateUrl: './customer-expanded-table.component.html',
  styleUrls: ['./customer-expanded-table.component.css'],
})
export class CustomerExpandedTableComponent
  extends TableHelper
  implements OnInit
{
  @Input() data: any;

  expandedColumns = HNTableColumns.CustomerExpandedColumns.map((item) => {
    return {
      columnDef: item,
      header: item,
      cell: (element: any) => `${element[item]}`,
    };
  });

  displayedColumns = this.expandedColumns.map((c) => c.columnDef);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.data) {
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
