import { Component, OnInit } from '@angular/core';
import { EndPointsServiceService } from './end-points-service.service';
import { IEndPoint } from './iend-point';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EndPointsServiceService]
})
export class AppComponent implements OnInit {
  title = 'Distributor Cerberus';
  /**
   * Точки подключения и обслуживания
   * 
   * @type {IEndPoint[]}
   * @memberOf AppComponent
   */
  endpoints: IEndPoint[];
  constructor(private endpointssrv: EndPointsServiceService) {}

  /**
   * Перемещение по элементам панели со ссылками
   * 
   * @param {number} index
   * @param {IEndPoint} endpoint
   * @returns
   * 
   * @memberOf AppComponent
   */
  trackByEndPoint(index: number, endpoint: IEndPoint) { return endpoint; }

  ngOnInit() {
    this.endpointssrv.getEndPoints()
      .then(result => {
        this.endpoints = result;
        console.log(this.endpoints);
      })
      .catch(exception => console.log(exception));
 }
}

