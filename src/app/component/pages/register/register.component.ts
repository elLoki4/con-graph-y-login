import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  persona = {
    mail: '',
    password: '',
  };

  constructor(
    private Auth: AngularFireAuth,
    private _snackBar: MatSnackBar,
  ) {}
  registrar() {
    const mail = this.persona.mail;
    const password = this.persona.password;
    this.Auth.createUserWithEmailAndPassword(mail, password).then((user) => {
      this._snackBar.open('el usuario fue creado', '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
