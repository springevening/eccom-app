import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  name: string = '';
  description: string = '';
  price: string = '';
  stock: string = '';

  constructor(private http: HttpClient) {}
  submitForm() {
    const formData = {
      name: this.name,
      description: this.description,
      price: this.price,
      stock: this.stock,
    };
    this.http
      .post('http://localhost:3000/api/product', formData)
      .subscribe(() => {
        // Form submitted successfully, you can clear fields or show a success message
      });
  }
}
