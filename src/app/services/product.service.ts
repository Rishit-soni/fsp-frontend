import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  url = environment.API.url;

  addProduct(data) {
    return this.http.post<any>(this.url + 'product', data);
  }

  getProduct(search){
    return this.http.get<any>(this.url + 'product/'+search);
  }
}
