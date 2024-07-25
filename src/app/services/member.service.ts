import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  url = environment.API.url;
  storedUrl = ''

  addMember(data) {
    return this.http.post<any>(this.url + 'members/basic-information', data);
  }

  updateMemberData(member_id, data) {
    return this.http.put<any>(
      this.url + 'members/basic-information/' + member_id,
      data
    );
  }

  getMembers(search) {
    return this.http.get<any>(this.url + 'members/' + search);
  }

  getMemberById(id) {
    return this.http.get<any>(this.url + 'members/get-member/' + id);
  }

  getMembersNameIdPair() {
    return this.http.get<any>(this.url + 'members/get-members/name-id');
  }

  addMeasurement(data) {
    return this.http.post<any>(this.url + 'measurement', data);
  }

  addMemberPackageDetails(data) {
    return this.http.post<any>(this.url + 'members/package-details', data);
  }

  addMemberPackage(data) {
    return this.http.post<any>(this.url + 'members/assign-member-package', data);
  }

  checkMemberExistByNumber(data) {
    return this.http.post<any>(this.url + 'members/check-member-exists', data);
  }

  getMemberPackage(id) {
    return this.http.get<any>(this.url + 'members/get-member-package/'+ id);
  }

  getMemberPackageBYMember(id) {
    return this.http.get<any>(this.url + 'members/get-member-package-member/'+ id);
  }
  updateMemberPackage(id, data) {
    return this.http.put<any>(this.url + 'members/update-member-package/'+ id, data);
  }

  addMemberWorkout(data) {
    return this.http.post<any>(this.url + 'members/assign-member-workout', data);
  }

  addMemberDiet(data) {
    return this.http.post<any>(this.url + 'members/assign-member-diet', data);
  }

  getMembersWithTask(search) {
    return this.http.get<any>(this.url + 'members/today-task' + search);
  }

  addVendor(data) {
    return this.http.post<any>(this.url + 'members/vendor', data);
  }

  getVendors() {
    return this.http.get<any>(this.url + 'members/vendor');
  }

  setUrl(url){
    this.storedUrl = url;
  }

  getUrl(){
    return this.storedUrl
  }
  
}
