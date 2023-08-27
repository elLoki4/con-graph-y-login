import { Component } from '@angular/core';

import { FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from '../../interface/usuario';
import { EnvironmentsService } from '../../service/environments.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  form: FormGroup;

  constructor(
    private fire: EnvironmentsService,
    private snack: MatSnackBar,
    private route: Router
  ) {
    this.form = new FormGroup({
      inversion: new FormGroup('', [Validators.required]),
      fecha: new FormGroup('', [Validators.required]),
      capital: new FormGroup('', [Validators.required]),
      valor: new FormGroup(''),
    });
  }

  openSnackBar() {
    this.snack.open('el usuario ya fue creado', '', {
      duration: 300,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async addUser() {
    const user: Usuario = {
      inversion: this.form.value.inversion,
      valor: this.form.value.valor,
      capital: this.form.value.capital,
      fecha: this.form.value.fecha,
    };
    const response = await this.fire.addUser(user);
    this.route.navigate(['/dashboard/inicio']);
  }
}
