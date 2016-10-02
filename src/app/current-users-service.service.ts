import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CurrentUsersServiceService {
  private url: string;
  constructor(private http: Http) { }

  public getCurrentUsersCollect(url: string) {
    this.url = url + '/api/cerber/users';
    return this.http.get(this.url).map((response: Response) => response.json());
  }

  public getCurrentUsers(url: string) {
    this.url = url + '/api/cerber/users';
    return Promise.resolve((this.http.get(this.url).map((response: Response) => response.json())).toPromise());
  }
}
