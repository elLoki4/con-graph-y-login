import { Component } from '@angular/core';

import { FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { product } from '../../interface/usuario';
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
    private route: Router,
  ) {
    this.form = new FormGroup({
      producto: new FormGroup('', [Validators.required]),
      fecha: new FormGroup('', [Validators.required]),
      stock: new FormGroup('', [Validators.required]),
      ventas: new FormGroup('', [Validators.required]),
    });
  }

  openSnackBar() {
    this.snack.open('producto añadido', '', {
      duration: 300,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async addUser() {
    const product: product = {
      producto: this.form.value.producto,
      ventas: this.form.value.ventas,
      stock: this.form.value.stock,
      fecha: this.form.value.fecha,
    };
    const response = await this.fire.addUser(product);
    this.route.navigate(['/dashboard/inicio']);
  }
}
