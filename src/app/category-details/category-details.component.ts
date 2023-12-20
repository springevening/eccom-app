import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../core/services/category.service';
import { Category } from '../core/models/category/category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
})
export class CategoryDetailsComponent implements OnInit {
  catagories!: Category[];
  columndefs: any[] = ['ID', 'Category', 'Description'];

  constructor(private categoryService: CategoryService) {}
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((data: any) => {
      this.catagories = data;
    });
  }
}
