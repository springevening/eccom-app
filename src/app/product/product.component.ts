import { Component, OnInit } from '@angular/core';
import { Product } from '../core/models/product/product';
import { Observable } from 'rxjs';
import { ProductService } from '../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
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
  productID: string = '';
  flag: boolean = true;
  constructor(
    private productService: ProductService,
    private a: ActivatedRoute
  ) {}
  async submitForm() {
    let product = new Product();
    product.name = this.name;
    product.description = this.description;
    product.price = this.price;
    product.stock = this.stock;
    console.log(product);
    // const formData = JSON.stringify(product);
    // const formData = {
    //   name: this.name,
    //   description: this.description,
    //   price: this.price,
    //   productstock: this.stock,
    // };

    // this.http
    //   .post('http://localhost:3000/api/product', product)
    //   .subscribe(() => {
    //     console.log('data added successfully');
    //   });
    // const productService = new ProductService(this.http);
    const resp = this.productService.createProduct(product).subscribe((res) => {
      console.log(res);
    });
    console.log(resp);
  }
  ngOnInit(): void {
    this.a.params.subscribe((data) => {
      this.productID = data['id'];
    });
    if (this.productID)
      try {
        this.productService.getProductById(this.productID).subscribe((data) => {
          if (data['id']) {
            this.name = data['name'];
            this.description = data['description'];
            this.price = data['price'];
            this.stock = data['stock'];
            this.flag = false;
          } else {
            console.log(data);
          }
        });
      } catch (error) {
        console.log(error);
      }
  }
}
