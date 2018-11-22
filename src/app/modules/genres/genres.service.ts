import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../core/http/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(
      private http: HttpClient,
      private apiService: ApiService)
  {

  }

  getListGenre(): Observable<any> {
    const url = this.apiService.apiUrl + 'genre';
    return this.http.get(url, this.apiService.httpOptions);
  }

  createGenre(data): Observable<any> {
    const url = this.apiService.apiUrl + 'genre';
    return this.http.post(url, data, this.apiService.httpOptions);
  }

  showGenre(genre_id): Observable<any> {
      const url = this.apiService.apiUrl + 'genre/' + genre_id;
      return this.http.get(url, this.apiService.httpOptions);
  }

  updateGenre(genre_id, data): Observable<any> {
      const url = this.apiService.apiUrl + 'genre/' + genre_id;
      return this.http.put(url, data, this.apiService.httpOptions);
  }

  deleteGenre(genre_id): Observable<any> {
      const url = this.apiService.apiUrl + 'genre/' + genre_id;
      return this.http.delete(url, this.apiService.httpOptions);
  }
}
