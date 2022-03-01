import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  TREE_DATA = [
    {
      name: 'orders',
      children: [
        { name: 'orders' }, 
        { name: 'orders/processing-team' }, 
        { name: 'app-manager' }],
    },
    {
      name: 'customers',
      children: [
        { name: 'customers' }, 
        { name: 'contacts' }],
    },
    {
      name: 'products',
      children: [
        { name: 'products' }, 
        { name: 'inventory' },
        { name: 'loss' }
      ],
    },
    {
      name: 'accounting',
      children: [
        { name: 'cost-price' }, 
        { name: 'payable-receivable' },
        { name: 'tax-office' }
      ],
    },
    {
      name: 'finance',
      children: [
        { name: 'accounts' },
        { name: 'cashflow' },
        { name: 'receivable' },
        { name: 'payable' },
      ],
    },
    {
      name: 'manager',
      children: [
        { name: 'manager' },
        { name: 'history' }
      ],
    },
  ];
  
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = this.TREE_DATA;
    
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  hasChild = (_: number, node: any) => node.expandable;

}
