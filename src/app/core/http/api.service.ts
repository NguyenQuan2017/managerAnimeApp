import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'http://localhost:9000/api/v1/';

  constructor(private token: TokenService) { }

  public httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json' ,
        'Authorization' : 'Bearer ' + this.token.getToken()
    })
  };
}
