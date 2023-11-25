import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnvironmentsService } from '../../service/environments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { product } from '../../interface/usuario';
import { ChartConfiguration } from 'chart.js';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  ngOnInit(): void {
    const subcribe = this.getUser.getProduct().subscribe((product) => {
      this.listProduct = product;

      this.agregarLabels(this.listProduct.map((data) => data.fecha));

      this.agregarDataset(
        this.listProduct.map((data) => data.ventas),
        'Ventas anuales',
      );
      this.dataSource = new MatTableDataSource(this.listProduct);
    });
  }
  listProduct: product[] = [];
  constructor(
    private fire: EnvironmentsService,
    private _snackBar: MatSnackBar,
    private getUser: EnvironmentsService,
    private firebase: AngularFireAuth,
    private route: Router,
  ) {}

  agregarLabels(datos: any) {
    this.barChartData.labels?.push(...datos);
  }
  agregarDataset(datos: number[], label: string): void {
    const newData = { data: datos, label: label };
    this.barChartData.datasets.push(newData);
  }

  /*  updateUser(user: product) {
    this.getUser.getProduct().subscribe((ProductData) => {
      this.listProduct = ProductData;
    });
  }*/
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  async eliminarProducto(product: product) {
    const deleteId = await this.fire.deleteProduct(product);
    this._snackBar.open('el producto fue eliminado', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  cerrar() {
    this.firebase.signOut();
    this.route.navigate(['/home/login']);
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };
  ngOnDestroy(): void {}
}
