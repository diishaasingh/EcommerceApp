import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/users.model';
import { IResponse } from '../models/response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;

  private url = `${this.baseUrl}/auth/login`;
  private AUTH_TOKEN = 'authToken';
  private USERNAME = 'USERNAME';

  constructor(private http: HttpClient) {}

  login(data: IUser): Observable<IResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<IResponse>(this.url, data, httpOptions);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.AUTH_TOKEN, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.AUTH_TOKEN);
    localStorage.removeItem(this.USERNAME);
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  logout(): void {
    this.removeAuthToken();
  }

  
}

