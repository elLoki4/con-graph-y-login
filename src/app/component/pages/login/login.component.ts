import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  persona = {
    mail: '',
    password: '',
  };
  constructor(
    private authLogin: AuthService,
    private ConfAut: AngularFireAuth,
    private route: Router
  ) {}

  login() {
    const datos = {
      mail: this.persona.mail,
      password: this.persona.password,
    };
    this.authLogin.login(datos);
  }

  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
}
