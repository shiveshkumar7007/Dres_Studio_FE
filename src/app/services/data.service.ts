import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = `${environment.backendUrl}/auth`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const url = `${this.apiUrl}/profile`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.get(url, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  getUserProfile(userId: string): Observable<any> {
    const url = `${this.apiUrl}/profile/${userId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.get(url, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  updateProfile(userData: any): Observable<any> {
    const url = `${this.apiUrl}/profile`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.put(url, userData, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  createNewContent(contentData: any): Observable<any> {
    const url = `${this.apiUrl}/content`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.post(url, contentData, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  getContentList(): Observable<any> {
    const url = `${this.apiUrl}/content`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.get(url, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  getTopArtists(): Observable<any> {
    const url = `${this.apiUrl}/content/top-artists`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.get(url, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  getLatestReleases(): Observable<any> {
    const url = `${this.apiUrl}/content/latest-releases`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.get(url, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  getContentById(contentId: string): Observable<any> {
    const url = `${this.apiUrl}/content/${contentId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.get(url, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  updateContentRating(contentId: string, rating: number): Observable<any> {
    const url = `${this.apiUrl}/content/rate`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    const body = {
      contentId,
      rating,
    };
    return this.http.put(url, body, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  createNewChallenge(challengeData: any): Observable<any> {
    const url = `${this.apiUrl}/challenge`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.post(url, challengeData, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  getUserChallenges(): Observable<any> {
    const url = `${this.apiUrl}/challenge`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.get(url, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

  updateChallenge(challengeId: string, challengeData: any): Observable<any> {
    const url = `${this.apiUrl}/challenge/${challengeId}`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('authToken') || '',
      }),
    };
    return this.http.patch(url, challengeData, options).pipe(
      catchError((error) => {
        console.error('API error', error);
        throw error;
      })
    );
  }

}
