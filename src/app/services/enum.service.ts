import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  constructor(private http: HttpClient) {}

  url = environment.API.url

  getInquiryEnums(){
    return this.http.get<any>(this.url + 'enum/inquiry');
  }

  getDietEnums(){
    return this.http.get<any>(this.url + 'enum/diet');
  }

  getWorkoutEnums(){
    return this.http.get<any>(this.url + 'enum/workout');
  }

 getMembershipEnums(){
    return this.http.get<any>(this.url + 'enum/membership');
  }

  getExpenseEnums(){
    return this.http.get<any>(this.url + 'enum/workout');
  }

  getProductEnums(){
    return this.http.get<any>(this.url + 'enum/product');
  }

  getFitnessGoalEnums(){
    return this.http.get<any>(this.url + 'enum/fitness-goal');
  }

  getPaymentMethodEnums(){
    return this.http.get<any>(this.url + 'enum/payment-method');
  }

  getCatgoriesEnums(){
    return this.http.get<any>(this.url + 'enum/categories');
  }

  getMembershipTypeEnums(){
    return this.http.get<any>(this.url + 'enum/membership-type');
  }

  getBodyPartEnums(){
    return this.http.get<any>(this.url + 'enum/body-part');
  }

  getTargetAreaEnums(body_part){
    return this.http.get<any>(this.url + 'enum/target-area/'+ body_part);
  }

  getExercisesEnums(target_area){
    return this.http.get<any>(this.url + 'enum/exercises/' + target_area);
  }

  getEmployeeEnums(){
    return this.http.get<any>(this.url + 'enum/employee');
  }

  getEmployeeRoleEnums(){
    return this.http.get<any>(this.url + 'enum/role');
  }

  getClientTypeEnums(){
    return this.http.get<any>(this.url + 'enum/client_type');
  }

}