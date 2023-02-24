import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  apiUrl: string = 'http://localhost:4000/api/auth';

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, {
      observe: 'response',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
      withCredentials: true,
    });
  }
}
