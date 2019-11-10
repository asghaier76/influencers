import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  isLoggedin: any;
  torus: any = {};
  did: any = {};
  userinfo: any = {};
  account: any;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  setTorus(torus){
    this.torus = torus;
  }

  setAccount(account) {
    this.account = account
  }


}
