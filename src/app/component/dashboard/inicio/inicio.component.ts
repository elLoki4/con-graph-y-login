import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnvironmentsService } from '../../service/environments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../interface/usuario';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  constructor(
    private fire: EnvironmentsService,
    private _snackBar: MatSnackBar,
    private getUser: EnvironmentsService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listUser: Usuario[] = [];

  ngOnInit(): void {
    this.getUser.getUser().subscribe((user) => {
      this.listUser = user;
      console.log(this.listUser);
      this.dataSource = new MatTableDataSource(this.listUser);
    });
  }
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = [
    'Username',
    'Name',
    'Lastname',
    'Sex',
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

  async eliminarUsuario(user: any) {
    const deleteId = await this.fire.deleteUser(user);
    this._snackBar.open('el usuario ya fue eliminado', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
