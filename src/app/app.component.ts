import { Component } from '@angular/core';
import { ServiceService } from './component/service/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isAuthenticated = false;
  constructor(private authService: ServiceService) {}
  gOnInit() {
    this.authService.isAuth().subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  logout() {
    this.authService.logout();
  }
}
