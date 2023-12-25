import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../core/models/category/category';
import { CategoryService } from '../core/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

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
  @Input('value') value = '';
  // constructor(private http: HttpClient) {}
  constructor(
    private categoryService: CategoryService,
    private a: ActivatedRoute,
    private toast: NgToastService,
    private route: Router
  ) {}
  submitForm() {
    if (this.flag) {
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
    } else {
      console.log('update');
      console.log(this.name, this.description);
      this.categoryService
        .updateCategoryById({
          id: this.categoryId,
          field: { name: this.name, description: this.description },
        })
        .subscribe(
          (data) => {
            console.log(data);
            this.toast.success({
              detail: 'Updated ',
              summary: 'Category updated successfully',
              position: 'topRight',
              duration: 5000,
              sticky: true,
            });
            setTimeout(() => {
              window.location.reload();
              // this.route.navigate(['category']);
            }, 2000);
          },
          (err) => console.log(err)
        );
    }
  }
  ngOnInit(): void {
    this.categoryId = this.value;
    // this.a.params.subscribe((data) => {
    //   this.categoryId = data['id'];
    // });
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
