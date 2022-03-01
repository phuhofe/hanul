import { Component } from '@angular/core';

import { environment } from '@environments/environment';

import { initializeApp } from 'firebase/app';
import { IconService } from './services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private iconService: IconService) {}

  ngOnInit() {
    this.initFireBase();
    this.iconService.registerIcons();
  }

  initFireBase() {
    const firebaseConfig = environment.firebaseConfigTest;
    const app = initializeApp(firebaseConfig);
  }
}
