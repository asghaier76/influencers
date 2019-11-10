import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { version } from 'punycode';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  res: any = {};
  headers: any;
  result:any;
  apitoken = 'y9hcm1BwzdHQO4Qg4RGDwdpmjNdzGrizw5bDshDe';
  apiversion = '3.0.3';
  apiUrl = 'https://api.crowdtangle.com/ce/links?link=';  //'https://kiddokin.herokuapp.com';
  // https://twitter.com/loomnetwork/status/1192101862838849536
  // &platforms=twitter&token=y9hcm1BwzdHQO4Qg4RGDwdpmjNdzGrizw5bDshDe&version=3.0.3
  constructor(public _http: HttpClient) {
    this.headers = new HttpHeaders().set('Authorization','Basic YXBpa2V5OlFzM1Z4OEd5NE11NkxuMw=='); 

    // this.headers = new HttpHeaders().set('Authorization','Basic bW9iaWxlYXBwOlF6M1ZzOUJ5NU14MExqMQ=='); 
  }

  getPosts(url,platform) {
    return new Promise((resolve, reject) => {
      this._http.get(this.apiUrl+url+'&platforms='+platform+'&token='+this.apitoken+'&version='+this.apiversion).subscribe(data => {
        resolve(data);
      }, err => {
        reject(err);
      });
    });
  }


  getUrl(url) {
    let gheaders = new HttpHeaders().set('Authorization','Basic YXBpa2V5OlFzM1Z4OEd5NE11NkxuMzQ='); 

    return new Promise((resolve, reject) => {
      this._http.get('https://kinconnectfaucet.herokuapp.com/urlshort/'+url,{ headers: gheaders }).subscribe(data => {
        this.res = data;
        console.log(this.res)
        resolve(data);
      }, err => {
        console.log(err)
        reject(err);
      });
    });
  }

  getBadges(did) {
    let gheaders = new HttpHeaders().set('Authorization','Basic YXBpa2V5OlFzM1Z4OEd5NE11NkxuMzQ='); 

    return new Promise((resolve, reject) => {
      this._http.get('https://kinconnectfaucet.herokuapp.com/dids/'+did,{ headers: gheaders }).subscribe(data => {
        this.res = data;
        console.log(this.res)
        resolve(data);
      }, err => {
        console.log(err)
        reject(err);
      });
    });
  }

  saveBadges(vc) {
    let gheaders = new HttpHeaders().set('Authorization','Basic YXBpa2V5OlFzM1Z4OEd5NE11NkxuMzQ='); 

    return new Promise((resolve, reject) => {
      this._http.post('https://kinconnectfaucet.herokuapp.com/dids/',vc,{ headers: gheaders }).subscribe(data => {
        this.res = data;
        console.log(this.res)
        resolve(data);
      }, err => {
        console.log(err)
        reject(err);
      });
    });
  }


}
