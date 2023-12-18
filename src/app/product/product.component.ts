import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../core/models/product/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  name: string = '';
  description: string = '';
  price: string = '';
  stock: string = '';
  constructor(private http: HttpClient) {}
  submitForm() {
    let product = new Product();
    product.name = this.name;
    product.description = this.description;
    product.price = this.price;
    product.stock = this.stock;
    console.log(product);
    const formData = JSON.stringify(product);
    // const formData = {
    //   name: this.name,
    //   description: this.description,
    //   price: this.price,
    //   productstock: this.stock,
    // };

    this.http
      .post('http://localhost:3000/api/product', formData)
      .subscribe(() => {
        console.log('data added successfully');
      });
  }
  ngOnInit(): void {}
}
