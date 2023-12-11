import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product/product.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: 'productdetails', component: ProductDetailsComponent },
  { path: 'product', component: ProductComponent },
  { path: '', redirectTo: '/productdetails', pathMatch: 'full' },
  { path: 'categorydetails', component: CategoryDetailsComponent },
  { path: 'category', component: CategoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
