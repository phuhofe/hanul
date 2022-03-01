import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { TableAction } from '@app/orders/models/table.enum';
import { EditProduct } from '@app/app-manager/models/manager.model';
import { allTypesOrder } from '@app/orders/models/mart-product.model';

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

export interface Units {
  value: string;
}
@Component({
  selector: 'app-product-manager-action',
  templateUrl: './product-manager-action.component.html',
  styleUrls: ['./product-manager-action.component.css']
})
export class ProductManagerActionComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() action: string = '';

  @Output() close = new EventEmitter();
  @Output() editProduct = new EventEmitter();
  @Output() addProduct = new EventEmitter();
  @Output() updatingForm = new EventEmitter();

  productForm!: FormGroup;
  pageName: string = 'Product';
  allTypes = allTypesOrder;
  isAddImage = false;
  isAddUnit = false;

  listUnits: any = [];

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  units: Units[] = [];

  selectedFiles: any;
  currentFileUpload: any;
  percentage: number = 0;

  previews: string[] = [];
  uploadedURL: string[] = [];
  countURL = 0;
  selectedFileNames: string[] = [];
  progressInfos: Array<any> = [];
  uploadingAll = false;
  allSuccess = false;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.data) {
      return this.initData();
    }
  }

  buildForm() {
    this.productForm = this.fb.group({
      app_name: ['', Validators.required],
      category: '',
      description: '',
      image: '',
      locality: '',
      meat: ['', Validators.required],
      units: [[]],
    });
  }

  initData() {
    if (this.data && this.data.image) {
      this.previews = [...this.data.image];
    }

    this.productForm.patchValue({
      app_name: this.data.app_name,
      category: this.data.category,
      description: this.data.description,
      image: this.data.image ? this.data.image : [],
      locality: this.data.locality,
      meat: this.data.meat,
      units: this.data.units,
    });

    if (this.productForm.value.units) {
      this.data.units.forEach((item: any) => {
        this.units.push({ value: item });
      });
    }
  }

  closeDialog() {
    this.close.emit(false);
  }

  resetAll() {}

  doAction() {
    if (this.productForm.invalid) {
      return;
    }

    const units = this.units.map((item: any) => {
      return item.value;
    });

    const images = this.previews.filter((image) => image.includes('https'));

    this.productForm.patchValue({
      image: [...images],
    });

    const data: EditProduct = {};
    const transformValue = this.productForm.value;

    data.app_name = transformValue.app_name;
    data.description = transformValue.description;
    data.locality = transformValue.locality;
    data.meat = transformValue.meat;
    data.category = transformValue.category;
    data.units = units ?? undefined;
    data.image = transformValue.image;

    if (this.action === TableAction.ADD) {
      this.addProduct.emit({
        ...data,
      });
    }

    if (this.action === TableAction.EDIT) {
      this.editProduct.emit({
        ...data,
      });
    }
  }

  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.units.push({ value });
    }
    event.chipInput!.clear();
  }

  remove(unit: Units): void {
    const index = this.units.indexOf(unit);

    if (index >= 0) {
      this.units.splice(index, 1);
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.selectedFileNames = [];
    this.progressInfos = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {};

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
      this.uploadToFirebase();
    }
  }

  onUpload(event: any) {
    this.selectedFiles.push(event.file);
  }

  removeImage(index: number) {
    this.previews.splice(index, 1);
  }

  uploadToFirebase(): void {
    const files: any = [...this.selectedFiles];
    const appName = this.productForm.value.app_name;
    this.countURL = files.length;

    files.forEach((file: any) => {
      const storage = getStorage();
      const storageRef = ref(storage, `app_products/${appName}` + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => this.catchSnapshot(snapshot),
        (error) => this.catchUploadError(error),
        () => this.getURLFromFirebase(uploadTask, files)
      );
    });
  }

  catchSnapshot(snapshot: any) {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    this.uploadingAll = true;
    this.allSuccess = false;

    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }

  catchUploadError(error: any) {
    switch (error.code) {
      case 'storage/unauthorized':
        console.log('storage/unauthorized', error);
        break;
      case 'storage/canceled':
        console.log('storage/canceled');
        break;
      case 'storage/unknown':
        console.log('storage/unknown');
        break;
    }
  }

  getURLFromFirebase(uploadTask: any, files: any) {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      this.uploadedURL.push(downloadURL);
      this.previews.push(downloadURL);
      this.uploadingAll = false;
    });
  }
}
