import { Router } from '@angular/router';
import { EncryptDecryptService } from './../../core/services/encrypt-decrypt.service';
import { ToasterService } from './../../core/services/toaster.service';
import { AuthenticationService } from './../../core/services/authentication.service';
import { LoginModel } from './../../core/models/login.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppConstant } from 'src/app/core/constants/app-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  userInfo: any;
  token: string;
  passwordType: string = String('password');
  LoginForm: LoginModel = new LoginModel();
  requestProcess: boolean = Boolean(false);
  unSubscribeAll: Subject<void> = new Subject();
  constructor(
    private authService: AuthenticationService,
    private toasterService: ToasterService,
    private encryptDecryptService: EncryptDecryptService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.LoginForm.email || !this.LoginForm.password) {
      this.toasterService.displaySnackBar('Please enter all fields', 'error');
      return;
    }
    const param = {
      email: this.LoginForm.email,
      password: this.LoginForm.password,
    };
    this.authService
      .loginUser(param)
      .pipe(takeUntil(this.unSubscribeAll))
      .subscribe((res) => {
        console.log(res);
        this.userInfo = res;
        console.log(this.userInfo, 'userInfo');
        // alert('hi G')
        // this.checkValidUser();
        this.toasterService.displaySnackBar(
          'User login successfully!!',
          'success'
        );
        // alert('hi');
        this.router.navigate(['/dashboard']);
      });
  }

  checkValidUser() {
    if (this.userInfo) {
      if (this.userInfo && this.token) {
        this.encryptDecryptService.setEncryptedLocalStorage(
          AppConstant.LocalStorageKeys.user,
          this.userInfo
        );
        // if token present (for real db)
        // this.encryptDecryptService.setEncryptedLocalStorage(
        //   AppConstant.LocalStorageKeys.token,
        //   this.token
        // );
        this.toasterService.displaySnackBar(
          'User login successfully!!',
          'success'
        );
        this.authService.currentUserSubject.next(this.userInfo);
        // this.authService.currentTokenSubject.next(this.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.authService.logoutUser();
      }
    }
  }

  ngOnDestroy() {
    if (this.unSubscribeAll) {
      this.unSubscribeAll.next();
      this.unSubscribeAll.complete();
    }
  }
}
