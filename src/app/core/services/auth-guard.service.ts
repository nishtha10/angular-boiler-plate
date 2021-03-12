import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppConstant } from '../constants/app-constant';
import { AuthenticationService } from './authentication.service';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  userLoginInformation: any;
  constructor(
    private router: Router,
    private encryptDecryptService: EncryptDecryptService,
    private authenticationService: AuthenticationService,
    private translateService: TranslateService
  ) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authenticationService.currentUser.subscribe((resp: any) => {
      if (resp && resp !== null && typeof resp !== undefined) {
        this.userLoginInformation = this.encryptDecryptService.getDecryptedLocalStorage(
          AppConstant.LocalStorageKeys.user
        );
      }
    });
  }

  canActivate() {
    if (
      this.encryptDecryptService.getDecryptedLocalStorage(
        AppConstant.LocalStorageKeys.user
      )
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
