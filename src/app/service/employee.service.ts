import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  api_url = 'https://employee-xpert.onrender.com'
  public local_url = 'http://localhost:4000'
  constructor(private http: HttpClient) {

   }
   getAllEmployees(){
    return this.http.get<any[]>(`${this.api_url}/admin-emp`);
   }
   getSelectedDepartment() {
    return this.http.get(`${this.api_url}/admin-dep/selected-dep`);
  }
  addEmployee(obj:any) {
    return this.http.post(`${this.local_url}/admin-emp`,obj);
  }
}
