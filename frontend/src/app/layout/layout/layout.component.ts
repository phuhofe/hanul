import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  isOpen = false;
  statusSidebar!: boolean;
  constructor(private layoutService: LayoutService) {
    this.layoutService.$isOpenSidebar.subscribe((data: boolean) => {
      this.statusSidebar = data;
    });
  }

  ngOnInit(): void {}
}
