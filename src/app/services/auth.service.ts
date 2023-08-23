import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/users.model'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://fakestoreapi.com/users'; 

  private authTokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url);
  }

  login(data:IUser): void {
    const token = this.generateToken();
    this.setAuthToken(token);
  }

  logout(): void {
    this.removeAuthToken();
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  private generateToken(): string {
    const tokenExpirationDays = 7; 
    const now = new Date();
    const expirationDate = new Date(now.getTime() + tokenExpirationDays * 24 * 60 * 60 * 1000);
    const tokenPayload = {
      exp: expirationDate.getTime() / 1000,
    };
    const base64Payload = btoa(JSON.stringify(tokenPayload));
    const token = `Bearer ${base64Payload}`;
    return token;
  }
  
}

