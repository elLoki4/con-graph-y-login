import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ServiceService } from '../../service/service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private isAuth: ServiceService,
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
      // Esto se ejecuta después de que la promesa se resuelve exitosamente
      /*  this.isAuth.isAuth().subscribe((status) => {
        console.log(status);
      });
    });
    
    this.isAuth.isAuth().subscribe((status) => {
      console.log(status);
    }); // Aquí devolverá el valor inicial (false)*/
      this.route.navigate(['/dashboard/inicio']);
    });
  }
}
