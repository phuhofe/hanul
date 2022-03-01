import { Component, Input, OnInit } from '@angular/core';

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent implements OnInit {
  @Input() appName!: string;

  selectedFiles: any;
  currentFileUpload: any;
  percentage: number = 0;

  previews: Array<any> = [];
  uploadedURL: string[] = [];
  countURL = 0;
  selectedFileNames: string[] = [];
  progressInfos: Array<any> = [];
  uploadingAll = false;
  allSuccess = false;

  constructor() {}

  ngOnInit(): void {}

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.selectedFileNames = [];
    this.progressInfos = [];

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;

      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
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
    this.countURL = files.length;

    files.forEach((file: any) => {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `app_products/${this.appName}` + file.name
      );
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
      if (this.uploadedURL.length === files.length) {
        this.uploadingAll = false;
        this.allSuccess = true;

        this.previews = [
          ...this.previews.filter((image) => image.includes('https')),
          ...this.uploadedURL,
        ];

        setTimeout(() => {
          this.allSuccess = false;
        }, 3000);
      }
    });
  }
}
