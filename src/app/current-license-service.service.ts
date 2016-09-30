import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ILicenseInfo } from './ilicense-info';
@Injectable()
export class CurrentLicenseServiceService {

  private url: string;
  public licInfo: ILicenseInfo;
  private http: Http;

  constructor() { }
  getCurrentLicense(url: string) {
    this.url = url + '/api/cerber/licences';
    return this.http.get(this.url).map(response => response.json()); // .subscribe(result => {return (result as ILicenseInfo); });
  }
}
