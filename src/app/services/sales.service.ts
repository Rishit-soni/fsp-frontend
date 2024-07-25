import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  constructor(private http: HttpClient) { }

  url = environment.API.url

  getSales(search) {
    return this.http.get<any>(this.url + 'sales/' + search)
  }

  addSales(data) {
    return this.http.post<any>(this.url + 'sales', data)
  }

  downloadSales(id) {
    return this.http.get(this.url + 'sales/download/invoice/' + id,
      {
        responseType: 'blob',
        headers: new HttpHeaders().append("Content-Type", "application/json")
      }
    )
  }

  getSalesById(id){
    return this.http.get<any>(this.url + 'sales/get-sales/' + id)
  }

  getAllSales(interval, search){
    return this.http.get<any>(this.url + 'sales/get-all-sales/'+interval +'/'+ search)
  }

  getSalesByMember(id){
    return this.http.get<any>(this.url + 'sales/member/' + id)
  }
 
  updateSalesById(id, data){
    return this.http.put<any>(this.url + 'sales/' + id, data)
  }

}
