import { Injectable } from '@angular/core';
import {ApiService} from '../../core/http/api.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  url: string;
  constructor(private apiService: ApiService,
              private http: HttpClient) {
       this.url = this.apiService.apiUrl + 'manga';
  }

  getListManga(): Observable<any> {
    return this.http.get( this.url, this.apiService.httpOptions);
  }

  createManga(data): Observable<any> {
    return this.http.post(this.url, data, this.apiService.httpOptions);
  }

  updateManga(manga_id, data): Observable<any> {
    return this.http.put(this.url + '/' + manga_id, data, this.apiService.httpOptions);
  }

  showManga(manga_id): Observable<any> {
      return this.http.get(this.url + '/' + manga_id, this.apiService.httpOptions);
  }

  deleteManga(manga_id): Observable<any> {
    return this.http.delete(this.url + '/' + manga_id, this.apiService.httpOptions);
  }
}
