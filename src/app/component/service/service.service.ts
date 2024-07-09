import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(
    private route: Router,
    private logOut: AngularFireAuth,
  ) {}
  private authStatus = new BehaviorSubject<boolean>(false);

  isAuth(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  logout(): void {
    this.logOut.signOut().then(function () {
      console.log('se cerro sesion');
    });
    console.log(this.logOut.onAuthStateChanged);
  }
}
