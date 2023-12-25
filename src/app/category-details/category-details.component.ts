import { Component, OnInit, Output } from '@angular/core';
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
  flag: boolean = true;
  @Output() value: string = '';
  constructor(private categoryService: CategoryService) {}
  getID(value: any) {
    this.value = value;
    this.flag = false;
  }
  ngOnInit(): void {
    this.flag = true;
    this.categoryService.getAllCategories().subscribe((data: any) => {
      this.catagories = data;
    });
  }
}
