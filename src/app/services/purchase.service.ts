import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  constructor(private http: HttpClient) {}

  url = environment.API.url

  getPurchases(search){
    return this.http.get<any>(this.url+ 'purchase/'+search)
  }

  addPurchase(data){
    return this.http.post<any>(this.url+'purchase', data)
  }
}
