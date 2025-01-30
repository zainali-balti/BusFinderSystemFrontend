import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';


export const userGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.getUserRole() === 'CUSTOMER' && loginService.isLoggedIn()) {
    return true;
  }

  router.navigate(['login']);
  return false;
};
