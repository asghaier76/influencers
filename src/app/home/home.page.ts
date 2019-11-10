import { Component } from '@angular/core';
import { NavController, LoadingController} from '@ionic/angular';

import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

import { WalletService } from '../wallet.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {
  public xcertprovider: any;
  torus: any;
  loader: any;
  constructor(private navCtrl: NavController, private loadCtrl: LoadingController, private wallet: WalletService) {
  }

  async login() {
    this.loader = await this.loadCtrl.create({
      message: 'Please wait..',
      spinner: 'bubbles'
    });
    await this.loader.present();
    try {
      this.torus = new Torus({buttonPosition: 'bottom-left'});
      await this.torus.init({
        network: {
          host: 'rinkeby', // default : 'mainnet'  
        },
        buildEnv: 'production'
      }); // other network options --- kovan, rospten, rinkeby
      this.torus.login({})
      .then(res => {
        this.wallet.setAccount(res);
        this.wallet.setTorus(this.torus);
        const web3 = new Web3(this.torus.provider);
        web3.eth.getAccounts().then(accounts => {
          this.wallet.setAccount = accounts[0];
        });
        this.navCtrl.navigateRoot('/main');
        this.loader.dismiss();
      })
      
    } catch (error) {
      console.error(error);
      this.loader.dismiss();
    }

  }

}
