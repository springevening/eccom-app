import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  name: string = '';
  description: string = '';
  constructor(private http: HttpClient) {}
  submitForm() {
    const formData = {
      name: this.name,
      description: this.description,
    };
    console.log(formData);

    this.http
      .post('http://localhost:3000/api/category', formData)
      .subscribe(() => {
        console.log('data added successfully');
      });
  }
  ngOnInit(): void {}
}
