import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import Web3 from "web3";
import EthrDID from 'ethr-did'


@Component({
  selector: 'app-did',
  templateUrl: './did.page.html',
  styleUrls: ['./did.page.scss'],
})
export class DidPage implements OnInit {
  torus: any;
  ethrdid: any;
  userinfo: any;
  did: any;
  constructor(private wallet: WalletService) {
    this.userinfo = this.wallet.userinfo;
    this.did = this.wallet.did;
    this.init();
   }

  async ngOnInit() {
    
   
  }

  async init() {
    this.torus = this.wallet.torus;
    const web3 = new Web3(this.torus.provider);
    let provider = this.torus.provider;

    console.log(provider)
    console.log(web3)
    const publicAddress = await this.torus.getPublicAddress({ verifier: 'google', verifierId: 'asghaier76@gmail.com'});
    const redditpublicAddress = await this.torus.getPublicAddress({ verifier: 'reddit', verifierId: 'asghaier'});
    const discordpublicAddress = await this.torus.getPublicAddress({ verifier: 'discord', verifierId: 'asghaier'});

    
    console.log(this.userinfo)
    this.ethrdid = new EthrDID({
      address: publicAddress,
      provider: this.torus.provider
    });
    console.log(new EthrDID({ address: redditpublicAddress, provider: this.torus.provider}));
    console.log(new EthrDID({ address: discordpublicAddress, provider: this.torus.provider}));

  }

}
