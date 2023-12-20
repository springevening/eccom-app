import { Component, OnInit } from '@angular/core';
import { Category } from '../core/models/category/category';
import { CategoryService } from '../core/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  id: string = '';
  name: string = '';
  description: string = '';
  categoryId: string = '';
  flag: boolean = true;
  // constructor(private http: HttpClient) {}
  constructor(
    private categoryService: CategoryService,
    private a: ActivatedRoute
  ) {}
  submitForm() {
    // const formData = {
    //   name: this.name,
    //   description: this.description,
    // };
    // console.log(formData);
    const category = new Category();
    category.name = this.name;
    category.description = this.description;

    // this.http
    //   .post('http://localhost:3000/api/category', category)
    //   .subscribe(() => {
    //     console.log('data added successfully');
    //   });
    this.categoryService.createCategory(category).subscribe((data) => {
      console.log(data);
    });
  }
  ngOnInit(): void {
    this.a.params.subscribe((data) => {
      this.categoryId = data['id'];
    });
    if (this.categoryId)
      try {
        this.categoryService
          .getCategoryById(this.categoryId)
          .subscribe((data) => {
            console.log(data);
            // if (data['id']) {
            this.name = data['name'];
            this.description = data['description'];
            this.flag = false;
            // } else {
            //   console.log(data);
            // }
          });
      } catch (error) {
        console.log(error);
      }
  }
}
