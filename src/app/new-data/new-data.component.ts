import { Component } from '@angular/core';
import { product } from '../component/interface/usuario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnvironmentsService } from '../component/service/environments.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-data',
  templateUrl: './new-data.component.html',
  styleUrls: ['./new-data.component.css'],
})
export class NewDataComponent {
  form: FormGroup;
  datos: any = '';

  constructor(
    private fire: EnvironmentsService,
    private snack: MatSnackBar,
    private route: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.form = new FormGroup({
      producto: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      ventas: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.activeRoute.params.pipe(
      switchMap((params) => {
        this.datos = this.fire.getDataId(params['id']);
        return this.datos;
      }),
    );
  }

  openSnackBar() {
    this.snack.open('producto actualizado', '', {
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
  }
}
