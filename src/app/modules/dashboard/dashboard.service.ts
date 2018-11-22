import { Injectable } from '@angular/core';
import {ApiService} from '../../core/http/api.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {

    constructor(private apiService: ApiService,
                public http: HttpClient
                ) { }

    getUserLatest(): Observable<any> {
        const url = this.apiService.apiUrl + 'user';
         return this.http.get(url, this.apiService.httpOptions);
    }

    getCountData(): Observable<any> {
        const url = this.apiService.apiUrl + 'count';
        return this.http.get(url, this.apiService.httpOptions);
    }

}