import { Component, Input, OnInit } from '@angular/core';

import printJS from 'print-js';
@Component({
  selector: 'app-print-test',
  templateUrl: './print-test.component.html',
  styleUrls: ['./print-test.component.css'],
})
export class PrintTestComponent implements OnInit {
  @Input() orders: any;
  @Input() order: any;

  yearPosition = { top: 8, left: 5.5 };
  monthPosition = { top: 8, left: 8 };
  datePosition = { top: 8, left: 10 };
  orderNoPosition = { top: 8, left: 5.5 };

  rowHeight = 2.45;

  constructor() {}

  ngOnInit(): void {}

  generateTopPosition(index: number) {
    const firstRowTopPosition = 20.5;
    return firstRowTopPosition + index * this.rowHeight;
  }
  
  generateTopPositionSecondPage(index: number) {
    const firstRowTopPosition = 20.5 + 57;
    return firstRowTopPosition + index * this.rowHeight;
  }

  onPrint(document: string) {
    printJS(document, 'image');
  }

  generateDatePosition() {
    return `
    .data {
      top: 0;
      position: relative;
    }

    .data .year {
      position: absolute;
      top: -2.5rem;
      left: 4rem;
    }  

    .data .month {
      position: absolute;
      top: -2.5rem;
      left: 7rem;
    }
    
    .data .date {
      position: absolute;
      top: -2.5rem;
      left: 9rem;
    }
  
    .data .orderNo {
      position: absolute;
      top: -2.5rem;
      left: 13rem;
    }`;
  }

  generateBusinessPosition() {
    return `
    .business {
    }

    .business .businessNo {
      position: absolute;
      top: 1rem;
      left: 29.5rem;
    }

    .business .ownerName {
      position: absolute;
      top: 1rem;
      left: 41.5rem;
    }

    .business .businessName {
      position: absolute;
      top: 2rem;
      left: 29.5rem;
    }
   
    .business .businessAddress {
      position: absolute;
      top: 3rem;
      left: 29.5rem;
    }

    .business .businessType {
      position: absolute;
      top: 4rem;
      left: 29.5rem;
    }
 
    .business .businessCategory {
      position: absolute;
      top: 5.5rem;
      left: 29.5rem;
    }
    
    .business .phoneNumber {
      position: absolute;
      top: 4.5rem;
      left: 41.5rem;
    }
    
    .business .faxNumber {
      position: absolute;
      top: 5.5rem;
      left: 41.5rem;
    }
    `;
  }

  generateFirstPageDataPosition(index: number) {
    const top = 0;
    const rowHeight = 1;

    return `
    .order-units {
      position: relative;
    }

    .first-col.row-${index} {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 2rem;
    }

    .first-col.row-${index}.locality {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 10rem;
    }

    .first-col.row-${index}.quantity {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 20rem;
    }
    
    .second-col.row-${index} {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 24rem;
    }
    
    .third-col.row-${index} {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 29rem;
    }

    .fourth-col.row-${index}{
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 40rem;
    }

    .fifth-col.row-${index}.serialNo{
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 38.5rem;
    }

    .fifth-col.row-${index}.blNo{
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 42.5rem;
    }
    `;
  }

  generateSecondPageDatePosition() {
    return `
    .data-2 {
      position: relative;
    }

    .data-2 .year-2 {
      position: absolute;
      top: 2.5rem;
      left: 3rem;
    }
    
    .data-2 .month-2 {
      position: absolute;
      top: 2.5rem;
      left: 6rem;
    }

    .data-2 .date-2 {
      position: absolute;
      top: 2.5rem;
      left: 8rem;
    }
    
    .data-2 .orderNo-2 {
      position: absolute;
      top: 2.5rem;
      left: 11rem;
    }
    `;
    
  }

  generateSecondePageBusinessPosition() {
    return `
    .business-2 {
      position: relative;
    }

    .business-2 .business-number {
      position: absolute;
      top: 1rem;
      left: 29.5rem;
    }

    .business-2 .ownerName-2 {
      position: absolute;
      top: 1rem;
      left: 41.5rem;
    }

    .business-2 .businessName-2 {
      position: absolute;
      top: 2rem;
      left: 29.5rem;
    }

    .business-2 .businessAddress-2 {
      position: absolute;
      top: 3rem;
      left: 29.5rem;
    }

    .business-2 .businessType-2 {
      position: absolute;
      top: 4rem;
      left: 29.5rem;
    }
 
    .business-2 .businessCategory-2 {
      position: absolute;
      top: 5rem;
      left: 29.5rem;
    }
    
    .business-2 .phoneNumber-2 {
      position: absolute;
      top: 4rem;
      left: 41.5rem;
    }
    
    .business-2 .faxNumber-2 {
      position: absolute;
      top: 5rem;
      left: 41.5rem;
    }
    `;
  }

  generateSecondPageDataPosition(index: number) {
    const top = 0;
    const rowHeight = 4.5;

    return `
    .order-units-2 {
      position: relative;
    }

    .first-col-2.row-${index}.app-name {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 2rem;
    }

    .first-col-2.row-${index}.locality {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 10rem;
    }

    .first-col-2.row-${index}.quantity {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 20rem;
    }
    
    .second-col-2.row-${index} {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 24rem;
    }
    
    .third-col-2.row-${index} {
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 29rem;
    }

    .fourth-col-2.row-${index}{
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 40rem;
    }

    .fifth-col-2.row-${index}.serialNo{
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 38.5rem;
    }

    .fifth-col-2.row-${index}.blNo{
      position: absolute;
      top: ${top + rowHeight}rem;
      left: 42.5rem;
    }
    `;
  }

  printManyOrderHtml(element: any, data:any) {
    let orderUnitStyles = '';
    let orderUnitStyles2 = '';

    data.forEach((order: any) => {
      order.order_units.forEach((element: any, index: number) => {
        orderUnitStyles =
          orderUnitStyles + this.generateFirstPageDataPosition(index);

        orderUnitStyles2 =
          orderUnitStyles2 + this.generateSecondPageDataPosition(index);
      });
    });

    const style = `
    @media print {

      * {
        -webkit-print-color-adjust: exact !important;
      }

      .container {
        position: relative;
      }

      .receipt-wrapper {
        position: absolute;
        top: 0;
      }
  
      ${this.generateDatePosition()}    

      ${this.generateBusinessPosition()} 

      ${orderUnitStyles}

      .receipt-wrapper-2 {
        position: absolute;
        top: 38.5rem;
      }

      ${this.generateSecondPageDatePosition()}

      ${this.generateSecondePageBusinessPosition()}

      ${orderUnitStyles2}
    }
    `;

    printJS({
      printable: element,
      type: 'html',
      style: style,
      onPrintDialogClose: () => {
      }
    });
  }

}
