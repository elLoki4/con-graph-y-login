import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnvironmentsService } from '../../service/environments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { product } from '../../interface/usuario';
import { ChartConfiguration } from 'chart.js';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit, AfterViewInit {
  constructor(
    private fire: EnvironmentsService,
    private _snackBar: MatSnackBar,
    private getUser: EnvironmentsService,
    private store: Store<any>,
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listProduct: product[] = [];
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'fecha',
    'producto',
    'stock',
    'ventas',
    'Action',
  ];

  title = 'ng2-charts-demo';

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [{ data: [], label: 'Ventas' }],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  ngOnInit(): void {
    this.getUser.getUser().subscribe((products) => {
      this.listProduct = products;
      this.dataSource = new MatTableDataSource(this.listProduct);
      this.initializeChartData(); // Inicializa los datos del gráfico con los productos obtenidos
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async eliminarProducto(product: any) {
    const deleteId = await this.fire.deleteUser(product);
    this.listProduct = this.listProduct.filter((p) => p.id !== product.id); // Actualiza la lista de productos
    this.dataSource.data = this.listProduct; // Actualiza la dataSource
    this.initializeChartData(); // Actualiza los datos del gráfico después de eliminar un producto
    this._snackBar.open('El producto fue eliminado', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  initializeChartData(): void {
    const labels = this.listProduct.map((product) => product.producto);
    const data = this.listProduct.map((product) => product.ventas);

    this.barChartData = {
      labels: labels,
      datasets: [{ data: data, label: 'Ventas' }],
    };
  }
}
