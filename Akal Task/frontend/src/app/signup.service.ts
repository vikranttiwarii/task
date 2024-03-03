import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  apiUrl = "http://localhost:5000"

  constructor(private http:HttpClient) { }

  create(data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/adduser`,data)
  }
  getData(obj:any): Observable<any>{
    return this.http.get(`${this.apiUrl}/getuser/${JSON.stringify(obj)}`)
  }
  updateUser(data:any,id:any): Observable<any>{
    return this.http.put(`${this.apiUrl}/updateuser/${id}`,data)
  }
  deleteUser(id:any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/deleteuser/${id}`)
  }
}
