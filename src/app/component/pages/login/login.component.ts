import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private ConfAut: AngularFireAuth,
    private route: Router,
  ) {}
  persona = {
    mail: '',
    password: '',
  };
  login() {
    const mail = this.persona.mail;
    const password = this.persona.password;
    this.ConfAut.signInWithEmailAndPassword(mail, password).then((user) => {
      if (user) {
        this.route.navigate(['/dashboard/inicio']);
      }
    });
  }
}
