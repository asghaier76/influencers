import { Component, OnInit } from '@angular/core';
import EthrDID from 'ethr-did'
import { Issuer } from 'did-jwt-vc/lib/types'
import { VerifiableCredentialPayload,  } from 'did-jwt-vc/lib/types'
import { createVerifiableCredential } from 'did-jwt-vc'
import { Resolver } from 'did-resolver/lib/resolver'
import ethr from 'ethr-did-resolver/dist/ethr-did-resolver.js'
import { verifyCredential } from 'did-jwt-vc'
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";
import { NavController } from '@ionic/angular';

import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  torus: any;
  constructor(private wallet: WalletService, private navCtrl: NavController,) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    
    this.torus = this.wallet.torus;
    const web3 = new Web3(this.torus.provider);
    let provider = this.torus.provider;

    console.log(provider)
    console.log(web3)

    this.wallet.userinfo = await this.torus.getUserInfo('Obtain User Profile Info');
    this.wallet.did = new EthrDID({address: this.wallet.account,provider: this.torus.provider});
    

  }

  goPage(url) {

    this.navCtrl.navigateRoot(url);

  }

}
