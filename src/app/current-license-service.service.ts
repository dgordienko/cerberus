import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ILicenseInfo } from './ilicense-info';
@Injectable()
export class CurrentLicenseServiceService {

  private url: string;
  public licInfo: ILicenseInfo;
  constructor(private http: Http) { }

  public getCurrentLicense(url: string) {
    this.url = url + '/api/cerber/licences';
    console.log(`Сервис получения лицензий ${this.url}`);
    let result = this.http.get(this.url).map((response: Response) => response.json());
    return Promise.resolve(result.toPromise());
  }
}
