import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl } from '@angular/forms';
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

  constructor(private Auth: AngularFireAuth) {}
  registrar() {
    const mail = this.persona.mail;
    const password = this.persona.password;
    this.Auth.createUserWithEmailAndPassword(mail, password).then((user) => {
      console.log(user);
    });
  }
}
