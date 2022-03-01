import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slash-screen',
  templateUrl: './slash-screen.component.html',
  styleUrls: ['./slash-screen.component.css'],
})
export class SlashScreenComponent implements OnInit {
  
  windowWidth!: string;
  showSplash = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.windowWidth = '-' + window.innerWidth + 'px';

      setTimeout(() => {
        this.showSplash = !this.showSplash;
      }, 500);
    }, 2000);
  }
}
