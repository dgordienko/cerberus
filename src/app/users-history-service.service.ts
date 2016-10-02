import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class UsersHistoryServiceService {

  /**
   * Ссылка на хост службы
   */
  private url = '/api/cerber/users/?begin='; /// {BEGIN}&end={END}';

  constructor(private history: Http) { }
  /**
   * Получение данных о истории подключенний пользователей
   */
  getUsers(url: string, begin: number, end: number) {
    this.url = this.url + `${begin}&end=${end}`;
    console.log(`Ссылка на сервси с историей поключений ${this.url}`);
  }
}
