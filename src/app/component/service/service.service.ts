import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private route: Router) {}
  /* isAuth(status: any): boolean {
    if (status === 'signIn') {
      this.route.navigate(['/dashboard/inicio']);
      return true;
    }
    return false;
  }*/
  private authStatus = new BehaviorSubject<boolean>(false);

  isAuth(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  login(): void {
    this.authStatus.next(true);
  }

  logout(): void {
    this.authStatus.next(false);
  }
}
