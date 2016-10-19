import { IDistributorLicenceInfo } from './../intrf/idistributor-licence-info';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import '../../rxjs-operators';

@Injectable()
export class LicenseStatusService {

  private url: string;

  /**
 * Ссылка на хост службы
 */
  private urlUsers = '/api/cerber/users/?begin=';
  private urlLicese = '/api/cerber/licences/?begin=';

  constructor(private http: Http) { }
  /**
   * Вызов сервиса получения данных о лицензиях филиала
   */
  public getCurrentLicense(url: string) {
    this.url = url + '/api/cerber/licences';
    let result = this.http.get(this.url).map((response: Response) => response.json());
    return Promise.resolve(result.toPromise());
  }

  /**
   * Теекущий статус лицензий пользователей
   *
   * @param {string} url
   * @returns
   *
   * @memberOf LicenseStatusService
   */
  public getCurrentLicenceStatus(url: string) {
    this.url = url + '/api/cerber/users';
    return Promise.resolve((this.http.get(this.url).map((response: Response) => response.json())).toPromise());
  }
  /**
   * Получение данных о истории подключенний пользователей
   */
  public getUseLicensedHistoty(url: string, begin: string, end: string) {
    this.urlUsers = url + this.urlUsers + `${begin}&end=${end}`;
    return Promise.resolve((this.http.get(this.urlUsers).map((response: Response) => response.json())).toPromise());
  };

  /**
 * Получение данных о истории использования лицензий
 *
 * @param {any} url
 * @param {any} begin
 * @param {string} end
 * @returns
 *
 * @memberOf UsersHistoryServiceService
 */
  public getUsersLicenseInfo(url, begin, end: string) {
    this.urlLicese = url + this.urlLicese + `${begin}&end=${end}`;
    return Promise.resolve((this.http.get(this.urlLicese).map((response: Response) => response.json())).toPromise());
  }
}
