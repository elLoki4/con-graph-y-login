import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ServiceService } from '../component/service/service.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(ServiceService);
  const router = inject(Router);

  return authService.isAuth().pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/home/login']); 
        return false;
      }
    }),
  );
};
