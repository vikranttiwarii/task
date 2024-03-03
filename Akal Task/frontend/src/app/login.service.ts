import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  apiUrl = "http://localhost:5000"

  login(data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,data)
  }
}
