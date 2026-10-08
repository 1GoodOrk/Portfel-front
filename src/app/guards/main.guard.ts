import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppCommunicationService } from '@port/services/app-communication.service';

export const mainGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const appCommunicationService = inject(AppCommunicationService);
  const router = inject(Router);
  if (!JSON.parse(appCommunicationService.sessionStorageGet('user'))) {
    router.navigate(['./login']);
  }
  return !!JSON.parse(appCommunicationService.sessionStorageGet('user'));
};

export const unprotectedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const appCommunicationService = inject(AppCommunicationService);
  const router = inject(Router);

  if (!appCommunicationService.getCurrentProject()._id) {
    router.navigate(['./main']);
  }
  return !!appCommunicationService.getCurrentProject()._id;
};

