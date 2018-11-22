import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../core/http/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  url: string;
  constructor(private http: HttpClient,
              private apiService: ApiService)
  {
    this.url = this.apiService.apiUrl + 'chapter';
  }

  getListChapter(): Observable<any> {
    return this.http.get(this.url, this.apiService.httpOptions);
  }

  createChapter(data): Observable<any> {
    return this.http.post(this.url, data, this.apiService.httpOptions);
  }
}
