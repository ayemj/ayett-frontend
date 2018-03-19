import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { UserDetails, TokenPayLoad, TokenResponse } from '../app-interface';
import { map } from 'rxjs/operators/map';

@Injectable()
export class AuthenticationService {

  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    // url call for logout
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return true;
      //return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  public loginMe(user: TokenPayLoad) {

    const response = this.http.post('http://localhost:8080/api/login',user).pipe(map((data: TokenResponse) => {
      if (data.token) {
        this.saveToken(data.token);
      }
      return data;
    })
  );
  return response;
  }


}
