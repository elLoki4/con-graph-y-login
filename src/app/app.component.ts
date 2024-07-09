import { Component, OnInit } from '@angular/core';
import { AuthService } from './component/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthStatus().subscribe((status: boolean) => {
      this.isLogged = status;
    });
  }

  cerrar() {
    this.authService.logout();
  }
}
