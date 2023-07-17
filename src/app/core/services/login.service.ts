import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  public isLoggedIn(): boolean {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      this.router.navigate(['login']);
      return false;
    }
    const data = JSON.parse(loggedInUser);
    const now = new Date();
    if (now.getTime() > data.expiry) {
      localStorage.removeItem('loggedInUser');
      this.router.navigate(['login']);
      return false
    }
    return true;
  }

  public userIsLoggedIn$() {
    return of(!!(localStorage.getItem('loggedInUser')));
  }

  public login(name: string, password: string): Observable<boolean> {
    if (password === 'Want2Drive') {
      const now = new Date();
      const data = {
        name,
        expiry: now.getTime() + 86400000 // 24 hours
      }
      localStorage.setItem('loggedInUser', JSON.stringify(data));
      return of(true);
    } else {
      return throwError('Password is not correct. Please try again.')
    }
  }

  public logout(): boolean {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['login']);
    return false
  }
}
