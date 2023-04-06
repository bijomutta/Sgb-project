import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  private url=environment.apiUrl;
  private apiUrl=this.url+'user';

  
  
  getCustomers(): Observable<User[]>
 { 
  const api=this.apiUrl+'/all/customer'
   return this.httpClient.get<User[]>(api);
 }
 getAdmins(): Observable<User[]>
 { 
  const api=this.apiUrl+'/all/admin'
   return this.httpClient.get<User[]>(api);
 }

  addCustomer(item: any): Observable<any[]> {
    const api=this.apiUrl+'/customer'
    return this.httpClient.post<any[]>(api, item);    
  }
  addAdmin(item: any): Observable<any[]> {
    const api=this.apiUrl+'/admin'
    return this.httpClient.post<any[]>(api, item);    
  }

  updateUser(id:any,item:any): Observable<any> {
    const api=`${this.apiUrl}/update/${id}`; 
    return this.httpClient.put<any>(api,item);    
  }
 
  deleteUser(id:any) {
    const api=`${this.apiUrl}/delete/${id}`; 
    return this.httpClient.delete<any>(api);    
  }

}
