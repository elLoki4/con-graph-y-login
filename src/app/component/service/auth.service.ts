import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login(persona: any) {
    this.auth
      .signInWithEmailAndPassword(persona.mail, persona.password)
      .then((user) => {
        this.router.navigate(['/dashboard/inicio']);
      })
      .catch((error) => {
        this.snackBar.open(`Login failed: ${error.message}`, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }

  registrar(persona: any) {
    this.auth
      .createUserWithEmailAndPassword(persona.mail, persona.password)
      .then((user) => {
        this.snackBar.open('El usuario fue creado', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['']);
      })
      .catch((error) => {
        this.snackBar.open(`Registro fallido: ${error.message}`, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  getAuthStatus() {
    return this.auth.authState;
  }
}
