import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-receivable',
  templateUrl: './add-receivable.component.html',
  styleUrls: ['./add-receivable.component.css']
})
export class AddReceivableComponent implements OnInit {

  @Input() data: any;
  @Input() type!: string;

  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.buildForm();
   }

  closeTab() {
    this.close.emit(true);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: this.data?.id ?? null,
      row_id: this.data?.row_id ?? null,
      date: this.data?.date ?? null,
      customer: this.data?.customer ?? null,
      name: this.data?.name ?? null,
      method: this.data?.method ?? null,
      received: this.data?.received ?? null,
      discount: this.data?.discount ?? null,
      total: this.data?.total ?? null,
      bank_account: this.data?.bank_account ?? null,
      notes: this.data?.notes ?? null,
      created: this.data?.created,
      updated: this.data?.updated,
    });
  }

  onSave(type: string) {
    this.save.emit({ type, data: this.form.value});
  }


}
