import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category/category';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3002/api/ecom/category';

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
  createCategory(Category: Category): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, Category);
  }
  getCategoryById(id: string): Observable<Category> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Category>(url);
  }
  updateCategoryById(object: Object): Observable<{ id: number }> {
    return this.http.put<{ id: number }>(this.apiUrl, object);
  }
}
