import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptDecryptService {
  constructor() {}

  setEncryptedLocalStorage(key: string, data: any) {
    if (data && key) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  getDecryptedLocalStorage(key: string) {
    if (key) {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  removeEncryptedLocalStorage(key: string) {
    if (key) {
      localStorage.removeItem(key);
    }
  }
}
