import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.getUserRole() === 'COMPANY' && loginService.isLoggedIn()) {
    return true;
  }

  router.navigate(['login']);
  return false;
};

