import { UserModel } from './../models/login.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConstant } from '../constants/app-constant';
import { LoginModel } from '../models/login.model';
import { EncryptDecryptService } from './encrypt-decrypt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  loginUserApi = 'loginUser';
  currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  currentTokenSubject: BehaviorSubject<any>;
  public currentToken: Observable<string>;

  constructor(
    private httpClient: HttpClient,
    private encryptDecryptService: EncryptDecryptService
  ) {
    this.getUserObservables();
    this.getTokenObservables();
  }

  getUserObservables() {
    this.currentUserSubject = new BehaviorSubject<any>(
      this.encryptDecryptService.getDecryptedLocalStorage(
        AppConstant.LocalStorageKeys.user
      )
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getTokenObservables() {
    this.currentTokenSubject = new BehaviorSubject<any>(
      this.encryptDecryptService.getDecryptedLocalStorage(
        AppConstant.LocalStorageKeys.token
      )
    );
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public get currentTokenValue() {
    return this.currentTokenSubject.value;
  }

  loginUser(param): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.loginUserApi, param);
  }

  logoutUser() {
    this.encryptDecryptService.removeEncryptedLocalStorage(
      AppConstant.LocalStorageKeys.user
    );
    this.encryptDecryptService.removeEncryptedLocalStorage(
      AppConstant.LocalStorageKeys.token
    );
    this.currentUserSubject.next(null);
    this.currentTokenSubject.next(null);
  }
}
