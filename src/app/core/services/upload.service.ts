import { Injectable } from '@angular/core';
import {ApiService} from '../http/api.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private apiService: ApiService,
              private http: HttpClient,
              private token: TokenService) { }

  upload(formData): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Authorization' : 'Bearer ' + this.token.getToken(),
        })
    };

    const url = this.apiService.apiUrl + 'file/upload';
    return this.http.post(url, formData, httpOptions);
  }

  setFiles(files) {
      return localStorage.setItem('files', JSON.stringify(files));
  }
  getFiles() {
      return localStorage.getItem('files');
  }

  getFileByUser(user_id, file_id): Observable<any> {
      const url = this.apiService.apiUrl + 'user/' + user_id + '/file/' + file_id;
      return this.http.get(url, this.apiService.httpOptions);
  }

  getFileByManga(manga_id, file_id): Observable<any> {
      const url = this.apiService.apiUrl + 'manga/' + manga_id + '/file/' + file_id;
      return this.http.get(url, this.apiService.httpOptions);
  }

  updateAvatar(file_id, data): Observable<any> {
      const url = this.apiService.apiUrl + 'file/' + file_id;
      return this.http.put(url, data, this.apiService.httpOptions);
  }
}
