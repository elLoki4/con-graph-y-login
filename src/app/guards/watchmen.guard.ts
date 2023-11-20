import { Injectable, inject } from '@angular/core';
import { product } from '../component/interface/usuario';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class watchmenGuard {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.afAuth.authState.pipe(
      take(1),
      map((user) => !!user),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['home/login']); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
        }
      }),
    );
  }
}
