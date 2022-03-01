import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

export class TableHelper {
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource();
  expandedElement: Array<any> = [];

  constructor() {}

  isAllSelected(): boolean {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    return false;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  pushPopElement(element: any) {
    const index = this.expandedElement.indexOf(element);

    if (index === -1) {
      this.expandedElement.push(element);
    } else {
      this.expandedElement.splice(index, 1);
    }
  }

  checkExpanded(element: any): boolean {
    let flag = false;
    this.expandedElement.forEach((e: any) => {
      if (e === element) {
        flag = true;
      }
    });
    return flag;
  }
}
