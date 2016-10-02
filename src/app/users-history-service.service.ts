import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UsersHistoryServiceService {

  /**
   * Ссылка на хост службы
   */
  private url = '/api/cerber/users/?begin=';
  constructor(private http: Http) { }
  /**
   * Получение данных о истории подключенний пользователей
   */
  getUsers(url: string, begin: number, end: number) {
    this.url = url + this.url + `{${begin}}&end={${end}}`;
    console.log(`Ссылка на сервис с историей поключений ${this.url}`);
    return Promise.resolve((this.http.get(this.url).map((response: Response) => response.json())).toPromise());
  }
}
