import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/pages/login/login.component';
import { RegisterComponent } from './component/pages/register/register.component';
import { SharedModule } from './component/shared/shared.module';
import { InicioComponent } from './component/dashboard/inicio/inicio.component';
import { CrearUsuarioComponent } from './component/dashboard/crear-usuario/crear-usuario.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard/reportes',
    loadChildren: () =>
      import('./component/dashboard/reportes/reportes.module').then(
        (m) => m.ReportesModule
      ),
  },
  {
    path: 'dashboard/crearusuario',
    component: CrearUsuarioComponent,
  },
  {
    path: 'dashboard/inicio',
    loadChildren: () =>
      import('./component/dashboard/inicio/inicio.module').then(
        (m) => m.InicioModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    InicioComponent,
    CrearUsuarioComponent,
  ],
  imports: [SharedModule, CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
