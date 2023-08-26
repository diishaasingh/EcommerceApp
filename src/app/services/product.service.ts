import { Injectable } from '@angular/core';
import { IProduct } from '../models/products.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = environment.baseUrl;

  private url = `${this.baseUrl}/products`;
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url);
  }
  
  getProductById(id: number): Observable<IProduct> {
    const productUrl = `${this.url}/${id}`;
    return this.http.get<IProduct>(productUrl);
  }
}



