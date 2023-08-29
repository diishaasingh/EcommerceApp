import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from 'src/app/models/users.model';
import {IResponse} from 'src/app/models/response.model';
import { Observable, tap } from 'rxjs';
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
  setUsername(username: string): void {
    localStorage.setItem(this.USERNAME, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME);
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

  onLogin(userData: IUser): Observable<IResponse> {
    return this.login(userData).pipe(
      tap((response: { token: any; }) => {
        const token = response.token;
        if (token) {
          this.setAuthToken(token);
          this.setUsername(userData.username);
        }
      })
    );
  }

  
  
}

