import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecom-app';
  constructor(private router: Router) {}
  navigate(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([`/categorydetails`]).then(() => {
        console.log(`After navigation I am on:${this.router.url}`);
      });
    });
  }
}
