import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  private url=environment.apiUrl;
  private apiUrl=this.url+'product';

  

  getReviews(id:any):Observable<any[]>
  {
    const api=`${this.apiUrl}/reviews/${id}`;
    return this.httpClient.get<any[]>(api);
  }
  addReview(review:any):Observable<any[]>
  {
    const api=this.apiUrl+'/add-review'
    return this.httpClient.post<any[]>(api, review);  
  }

  filterByColors(colors:any):Observable<any>
  {
    const api=this.apiUrl+'/filter-color';
    return this.httpClient.post<any[]>(api,colors);
  }
  
  filterByCategory(name:string)
  {
    const api = `${this.apiUrl}/filter-category?name=${name}`;
    return this.httpClient.get<any[]>(api);
  }
  filterByBrand(name:string)
  {
    const api=this.apiUrl+'/filter-brand';
    return this.httpClient.post<any[]>(api,name);
  }
  filterByName(name:string)
  {
    const api = `${this.apiUrl}/filter-name?name=${name}`;
    return this.httpClient.get<any[]>(api);
  }

  filterByColor(color:string)
  {
    const api = `${this.apiUrl}/filter-color?color=${color}`;
    return this.httpClient.get<any[]>(api);
  }
  sortByName(name: string, dir: string) {
    const api = `${this.apiUrl}/sort-name?name=${name}&dir=${dir}`;
    return this.httpClient.get<any[]>(api);
  }
  sortByPrice(name: string, dir: string) {
    const api = `${this.apiUrl}/sort-price?name=${name}&dir=${dir}`;
    return this.httpClient.get<any[]>(api);
  }

  getProducts(): Observable<Product[]>
 {  
  const api=this.apiUrl+'/all'
   return this.httpClient.get<Product[]>(api);
 }

 getById(id:any):Observable<any>
 {
  const api=`${this.apiUrl}/find/${id}`;
  return this.httpClient.get<any>(api);
 }

 
  //Create a New Proudct
 addProduct(item: any): Observable<any[]> {
  const api=this.apiUrl+'/add'
    return this.httpClient.post<any[]>(api, item);    
  }

   //Update Proudct
  updateProduct(id:any,item:any): Observable<any> {
    const api=`${this.apiUrl}/update/${id}`;
    return this.httpClient.put<any>(api, item);    
  }
  //Delete Proudct
  deleteProduct(id:any) {
    const api=`${this.apiUrl}/delete/${id}`;
    return this.httpClient.delete<any>(api);    
  }

}

