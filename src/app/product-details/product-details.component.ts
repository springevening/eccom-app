import { Component, OnInit } from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from '../core/models/product/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  products!: Product[];
  columndefs: any[] = ['ID', 'Name', 'Description', 'Price', 'Stock'];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const productService = new ProductService(this.http);
    const resp = productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
    console.log(resp);
  }
}
