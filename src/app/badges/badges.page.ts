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

import { WalletService } from '../wallet.service';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-badges',
  templateUrl: './badges.page.html',
  styleUrls: ['./badges.page.scss'],
})
export class BadgesPage implements OnInit {
  torus: any;
  badges: any = [];
  constructor(private wallet: WalletService, private _api: ApiService) {
    this.init();
   }

  async init() {
    this.badges = await this._api.getBadges(this.wallet.did);
  }

  ngOnInit() {
  }

}
