import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(private http: HttpClient) {}

  url = environment.API.url;

  addExpense(data) {
    return this.http.post<any>(this.url + 'expense', data);
  }

  getExpenses(search){
    return this.http.get<any>(this.url + 'expense/'+search);
  }

  addExpenseType(data) {
    return this.http.post<any>(this.url + 'expense/expense-type', data);
  }

  getExpenseType(){
    return this.http.get<any>(this.url + 'expense/expense-type');
  }
}
