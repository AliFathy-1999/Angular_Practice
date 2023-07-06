import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  api_url = 'https://employee-xpert.onrender.com'
  constructor(private http: HttpClient) {

   }
   getAllEmployees(){
    return this.http.get<any[]>(`${this.api_url}/admin-emp`);
   }
}
