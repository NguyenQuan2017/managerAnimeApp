import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';
import {ApiService} from '../../core/http/api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor( private apiService: ApiService,
               public http: HttpClient) {}

  register(data): Observable<any> {
      const url = this.apiService.apiUrl + 'register' ;
      console.log(data);
      return this.http.post(url, data, this.apiService.httpOptions);
  }

  getUser(): Observable<any> {
    const url = this.apiService.apiUrl + 'user';
    return this.http.get(url, this.apiService.httpOptions);
  }

  getUserUpdate(user_id): Observable<any> {
      const url = this.apiService.apiUrl + 'user/' + user_id;
      return this.http.get(url, this.apiService.httpOptions);
  }

  updateUser(id, data): Observable<any> {
      const url = this.apiService.apiUrl + 'user/' + id;
      return this.http.put(url, data, this.apiService.httpOptions);
  }

  deleteUser(user_id): Observable<any> {
      const url = this.apiService.apiUrl + 'user/' + user_id;
      return this.http.delete(url, this.apiService.httpOptions);
  }

}
