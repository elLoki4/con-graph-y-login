import { Component } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      producto: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      ventas: new FormControl('', [Validators.required]),
    });
  }

  openSnackBar() {
    this.snack.open('producto añadido', '', {
      duration: 300,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  async addProduct() {
    const product: product = {
      producto: this.form.value.producto,
      ventas: this.form.value.ventas,
      stock: this.form.value.stock,
      fecha: this.form.value.fecha,
    };
    const response = await this.fire.addProduct(product);
    this.route.navigate(['/dashboard/inicio']);
  }
  async updateProduct() {
    const product: product = {
      producto: this.form.value.producto,
      ventas: this.form.value.ventas,
      stock: this.form.value.stock,
      fecha: this.form.value.fecha,
    };
    const response = await this.fire.updateProduct(product);
    this.route.navigate(['/dashboard/inicio']);
  }
}
