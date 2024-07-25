import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }

  url = environment.API.url

  getRevenue(interval) {
    return this.http.get<any>(this.url + 'dashboard/revenue' + interval)
  }

  getExpense(interval) {
    return this.http.get<any>(this.url + 'dashboard/expense' + interval)
  }

  getPendingReceivalPayment(interval) {
    return this.http.get<any>(this.url + 'dashboard/pending-receival-payment' + interval)
  }

  getTask(search) {
    return this.http.get<any>(this.url + 'dashboard/task/' + search)
  }

  getNewRenewMembers(interval) {
    return this.http.get<any>(this.url + 'dashboard/new-renew-members' + interval)
  }

  getActiveInActiveMembers(interval) {
    return this.http.get<any>(this.url + 'dashboard/active-inactive-members' + interval)
  }

  getProfitLossChart(interval) {
    return this.http.get<any>(this.url + 'dashboard/profit-loss-chart/' + interval)
  }

  getPromotionalChart(interval) {
    return this.http.get<any>(this.url + 'dashboard/promotional-chart/' + interval)
  }

  getPrductSellingChart(interval) {
    return this.http.get<any>(this.url + 'dashboard/product-selling-chart/' + interval)
  }

}
