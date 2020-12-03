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

  getToken() {
    let token = sessionStorage.getItem("token");
    if (token) {
      return token;
    }
  }

  getProductDetails() {
    let token = sessionStorage.getItem("token");
    return this.http.get("http://localhost:3000/productData", { headers: { Authorization: `Bearer ${this.getToken()}` } }) as Observable<any>;
  }

  addProduct(productData: any) {
    console.log(productData);
    return this.http.post("http://localhost:3000/addProduct", productData) as Observable<any>;
  }

  editProductDetail(productData: any) {
    console.log(productData);
    return this.http.put("http://localhost:3000/editProductDetail", productData) as Observable<any>;
  }

  deleteProduct(productId: any) {
    return this.http.delete("http://localhost:3000/deleteProduct", {
      params: { productId: productId }
    }) as Observable<any>;
  }

  productDetail(productId: any) {
    return this.http.get("http://localhost:3000/productDetail", {
      params: { productId: productId }
    }) as Observable<any>;
  }
}
