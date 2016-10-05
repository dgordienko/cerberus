import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
@Injectable()
export class MockDataServiceService {

  constructor(private http: Http) { }

  getMockData() {
    let url = 'https://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?';
    return Promise.resolve((this.http.get(url).map((response: Response) => response.json())).toPromise());

  }

}
