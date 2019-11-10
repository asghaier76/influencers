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
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public xcertprovider: any;
  url: any = '';
  torus: any;
  userAddress: any;
  platform: any = 'reddit';
  twitterpost: any = [];
  redditposts: any = [];
  facebookposts: any = [];
  constructor(private wallet: WalletService, private _api: ApiService) { }

  ngOnInit() {
    this.init();
  }

  async init() {
    
    this.torus = this.wallet.torus;
    const web3 = new Web3(this.torus.provider);
    let provider = this.torus.provider;
    web3.eth.getAccounts().then(accounts => {
      this.userAddress = accounts[0];
      console.log(this.userAddress)
    });

    
  }

  async getUrlPosts() {
    try {
      let result: any;
      result = await this._api.getPosts(this.url,this.platform);
      // if(this.platform == 'reddit')
          this.redditposts = result.result.posts.posts;
      console.log(this.redditposts[0].message)
    }
    catch (err) {
      console.log('error in tangle');
    };
  }

  async tipUser(url) {
    let shorturl = url.substring(16);
    let redditUrl: any = {};
    try {
      redditUrl = await this._api.getUrl(shorturl);
      console.log(redditUrl)
    }
    catch (err) {
      console.log('error in tangle');
    };

    let redditURLsubstring = redditUrl.message.substring(25);
    let position = redditURLsubstring.indexOf('/');

    let reddituser = redditURLsubstring.substring(0,position);

    let redditAddress = await this.torus.getPublicAddress({verifier: 'reddit', verifierId: reddituser});

    const web3 = new Web3(this.torus.provider);

    await web3.eth.sendTransaction({
      from: this.userAddress,
      to: redditAddress,
      value: '1000000000000000'
    })

  }

  async tipTwitterUser(url) {
    let twitterUrl = url.substring(21);

    let position = twitterUrl.indexOf('/');

    let twitteruser = twitterUrl.substring(0,position);

    let twitterAddress = await this.torus.getPublicAddress({verifier: 'reddit', verifierId: twitteruser});

    const web3 = new Web3(this.torus.provider);

    await web3.eth.sendTransaction({
      from: this.userAddress,
      to: twitterAddress,
      value: '1000000000000000'
    })

  }


  async offerBadge(url) {
    let redditUrl: any = {};
    let shorturl = url.substring(16);
    try {
      redditUrl = await this._api.getUrl(shorturl);
      console.log(redditUrl)
    }
    catch (err) {
      console.log('error in tangle');
    };

    let redditURLsubstring = redditUrl.message.substring(25);
    let position = redditURLsubstring.indexOf('/');

    let reddituser = redditURLsubstring.substring(0,position);

    let redditAddress = await this.torus.getPublicAddress({verifier: 'reddit', verifierId: reddituser});

    const web3 = new Web3(this.torus.provider);

    const vcPayload: VerifiableCredentialPayload = {
      sub: 'did:ethr:'+redditAddress,
      nbf: 1562950282,
      vc: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential'],
        credentialSubject: {
          "badge": {
            "type": "OpenBadge",
            "name": "Reddit Influncer",
            "description": "This badge is awarded for reddit users that have reached to more audience.",
            "image": "https://cdn.imgbin.com/15/1/18/imgbin-social-media-marketing-influencer-marketing-digital-marketing-blog-campaign-HqSxtVivxHfM7fqVY23vupN2g.jpg",
            "issuer": {
              "id": "did:ethr:0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198",
              "url": "https://ethwaterloo.com",
              "email": "info@ethwaterloo.com"
            }
          }
        }
      }
    }

    // const issuer: Issuer = new EthrDID({
    //   address: this.userAddress,
    //   provider: this.torus.provider
    // });
    const issuer: Issuer = new EthrDID({
      address: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
      privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75'
    })
    // let signer = await fethrdid.createSigningDelegate();
    // // issuer2.signer = signer;
    // console.log(signer)
    // console.log(issuer2)
    // issuer2.signer = signer;
    const vcJwt = await createVerifiableCredential(vcPayload, issuer);
    console.log(vcPayload);
    console.log(vcJwt);
    let badge = {jwtvc: vcJwt, sub: 'did:ethr:'+redditAddress, badge: {type: "OpenBadge",name: "Reddit Influncer",description: "This badge is awarded for reddit users that have reached to more audience." ,image: "https://cdn.imgbin.com/15/1/18/imgbin-social-media-marketing-influencer-marketing-digital-marketing-blog-campaign-HqSxtVivxHfM7fqVY23vupN2g.jpg",issuer: {id: "did:ethr:0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198",url: "https://tesla.com",email: "info@tesla.com"} } }
    await this._api.saveBadges(badge);

  }

  async offerBadgeTwitter(url) {
    let twitterUrl = url.substring(21);

    let position = twitterUrl.indexOf('/');

    let twitteruser = twitterUrl.substring(0,position);

    let twitterAddress = await this.torus.getPublicAddress({verifier: 'reddit', verifierId: twitteruser});

    const web3 = new Web3(this.torus.provider);

    const vcPayload: VerifiableCredentialPayload = {
      sub: 'did:ethr:'+twitterAddress,
      nbf: 1562950282,
      vc: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential'],
        credentialSubject: {
          "badge": {
            "type": "OpenBadge",
            "name": "Reddit Influncer",
            "description": "This badge is awarded for reddit users that have reached to more audience.",
            "image": "https://cdn.imgbin.com/15/1/18/imgbin-social-media-marketing-influencer-marketing-digital-marketing-blog-campaign-HqSxtVivxHfM7fqVY23vupN2g.jpg",
            "issuer": {
              "id": "did:ethr:"+this.userAddress,
              "url": "https://ethwaterloo.com",
              "email": "info@ethwaterloo.com"
            }
          }
        }
      }
    }

    // const issuer: Issuer = new EthrDID({
    //   address: this.userAddress,
    //   provider: this.torus.provider
    // });
    const issuer: Issuer = new EthrDID({
      address: '0xf1232f840f3ad7d23fcdaa84d6c66dac24efb198',
      privateKey: 'd8b595680851765f38ea5405129244ba3cbad84467d190859f4c8b20c1ff6c75'
    })
    // let signer = await fethrdid.createSigningDelegate();
    // // issuer2.signer = signer;
    // console.log(signer)
    // console.log(issuer2)
    // issuer2.signer = signer;
    const vcJwt = await createVerifiableCredential(vcPayload, issuer);
    console.log(vcJwt)

  }


}
