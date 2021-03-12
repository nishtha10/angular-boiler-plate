import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppConstant } from '../constants/app-constant';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root',
})
export class IsloggedInService implements CanActivate {
  userData: any;
  constructor(
    private encryptDecryptService: EncryptDecryptService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    this.userData = this.encryptDecryptService.getDecryptedLocalStorage(
      AppConstant.LocalStorageKeys.user
    );
    if (this.userData) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
