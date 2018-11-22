import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../core/http/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient,
               private apiService: ApiService)
  {

  }

  getAllListCategory(): Observable<any> {
    const url = this.apiService.apiUrl + 'category';
    return this.http.get(url, this.apiService.httpOptions);
  }

  createCategory(data): Observable<any> {
    const url = this.apiService.apiUrl + 'category';
    return this.http.post(url, data, this.apiService.httpOptions);
  }

  showCategoryById(category_id): Observable<any> {
    const url = this.apiService.apiUrl + 'category/' + category_id;
    return this.http.get(url, this.apiService.httpOptions);
  }

  updateCategory(category_id, data): Observable<any> {
      const url = this.apiService.apiUrl + 'category/' + category_id;
      return this.http.put(url, data, this.apiService.httpOptions);
  }

  deleteCategoryById(category_id): Observable<any> {
    const url = this.apiService.apiUrl + 'category/' + category_id;
    return this.http.delete(url, this.apiService.httpOptions );
  }

}
