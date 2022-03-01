import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css'],
})
export class ProductImageComponent implements OnInit {
  
  @Input() imageSrc = '';
  loading: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  onLoad() {
    this.loading = false;
  }
}
