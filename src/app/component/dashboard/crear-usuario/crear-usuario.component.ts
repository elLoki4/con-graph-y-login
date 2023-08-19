import { Component } from '@angular/core';

import { FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario, sexo } from '../../interface/usuario';
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
      usuario: new FormGroup('', [Validators.required]),
      nombre: new FormGroup('', [Validators.required]),
      apellido: new FormGroup('', [Validators.required]),
      sexo: new FormGroup(''),
      img: new FormGroup(''),
    });
  }
  sexo: sexo[] = [
    { value: 'masculino', viewValue: 'masculino' },
    { value: 'masculino', viewValue: 'masculino' },
  ];

  openSnackBar() {
    this.snack.open('el usuario ya fue creado', '', {
      duration: 300,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async addUser() {
    const user: Usuario = {
      name: this.form.value.nombre,
      userName: this.form.value.usuario,
      lastName: this.form.value.apellido,
      sex: this.form.value.sex,
      img: this.form.value.img,
    };
    const response = await this.fire.addUser(user);
    this.route.navigate(['/dashboard/inicio']);
  }
}
