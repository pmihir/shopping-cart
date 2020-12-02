import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  headers_object = new HttpHeaders().set("Authorization", "Bearer " + sessionStorage.getItem("token"));

  httpOptions = {
    headers: this.headers_object
  }

  constructor(private http: HttpClient) {

  }

  login(userData: any) {
    return this.http.post("http://localhost:3000/login", userData) as Observable<any>;
  }

  getProductDetails() {
    let token = sessionStorage.getItem("token");
    return this.http.get("http://localhost:3000/productData", { headers: { Authorization: `Bearer ${token}` } }) as Observable<any>;
  }
}
