import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
})
export class EditCustomerComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() type!: string;

  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() updatingForm = new EventEmitter();

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.data) {
      return this.initData();
    }
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
        this.updatingForm.emit({
          ...this.data,
          ...this.form.value,
        });
      });
  }

  closeTab() {
    this.close.emit(true);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      customer: ['', Validators.required],
      name: '',
      business_no: '',
      owner: '',
      assignee: '',
      phone_no: '',
      fax_no: '',
      address: '',
      notes: '',
      business_type: '',
      business_type_detail: '',
      business_type_2: '',
      business_type_2_detail: '',
      credit_limit: '',
      created: '',
      updated: '',
    });
  }

  initData() {
    this.form.patchValue({
      customer: this.data?.customer ?? '',
      name: this.data?.name ?? '',
      business_no: this.data?.business_no ?? '',
      owner: this.data?.owner ?? '',
      assignee: this.data?.assignee ?? '',
      phone_no: this.data?.phone_no ?? '',
      fax_no: this.data?.fax_no ?? '',
      address: this.data?.address ?? '',
      notes: this.data?.notes ?? '',
      business_type: this.data?.business_type ?? '',
      business_type_detail: this.data?.business_type_detail ?? '',
      business_type_2: this.data?.business_type_2 ?? '',
      business_type_2_detail: this.data?.business_type_2_detail ?? '',
      credit_limit: this.data?.credit_limit ?? '',
      created: this.data?.created ?? '',
      updated: this.data?.updated ?? '',
    });
  }

  filterNullValue(obj: any) {
    return Object.entries(obj).reduce(
      (a: any, [k, v]) => (v === null || v === '' ? a : ((a[k] = v), a)),
      {}
    );
  }

  onSave(type: string) {
    const data = this.filterNullValue(this.form.value);
    this.save.emit({ type, data: data });
  }
}
