import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnvironmentsService } from '../../service/environments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { product } from '../../interface/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  constructor(
    private fire: EnvironmentsService,
    private _snackBar: MatSnackBar,
    private getUser: EnvironmentsService,
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listProduct: product[] = [];

  ngOnInit(): void {
    this.getUser.getUser().subscribe((product) => {
      this.listProduct = product;
      console.log(this.listProduct);
      this.dataSource = new MatTableDataSource(this.listProduct);
    });
  }
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'fecha',
    'producto',
    'stock',
    'ventas',
    'Action',
  ];
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async eliminarUsuario(product: any) {
    const deleteId = await this.fire.deleteUser(product);
    this._snackBar.open('el usuario ya fue eliminado', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
