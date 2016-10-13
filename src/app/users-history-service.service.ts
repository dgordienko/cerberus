import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UsersHistoryServiceService {

  /**
   * Ссылка на хост службы
   */
  private urlUsers = '/api/cerber/users/?begin=';
  private urlLicese = '/api/cerber/licences/?begin=';
  constructor(private http: Http) { }
  /**
   * Получение данных о истории подключенний пользователей
   */
  getUseLicensedHistoty(url: string, begin: string, end: string) {
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
  getUsersLicenseInfo(url, begin, end: string) {
    this.urlLicese = url + this.urlLicese + `${begin}&end=${end}`;
    return Promise.resolve((this.http.get(this.urlLicese).map((response: Response) => response.json())).toPromise());
  }
}
