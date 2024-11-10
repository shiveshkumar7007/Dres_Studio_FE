import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.backendUrl;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  signup(name: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/user/signup`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { name, email, password };
    return this.http.post(url, body, { headers }).pipe(
      catchError((error) => {
        console.error('Signup error', error);
        throw error;
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/user/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.http.post<any>(url, body, { headers }).pipe(
      tap((response: any) => {
        const authToken = response?.data?.authToken || '';
        if (authToken) {
          localStorage.setItem('authToken', authToken);
          localStorage.setItem('userData', JSON.stringify(response.data));
          this.isLoggedInSubject.next(true);
        }
      }),
      catchError((error) => {
        console.error('Login error', error);
        throw error;
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUserId(): any {
    const userData = localStorage.getItem('userData');
    const userId = (userData ? JSON.parse(userData) : {}).userId;
    return userId;
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    this.isLoggedInSubject.next(false);
  }
}
