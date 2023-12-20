import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  name: string = '';
  description: string = '';

  constructor(private http: HttpClient) {}
  SubmitForm() {
    const formData = {
      name: this.name,
      description: this.description,
    };
    this.http
      .post('http://localhost:3000/api/category', formData)
      .subscribe(() => {
        // Form submitted successfully, you can clear fields or show a success message
      });
  }
}
