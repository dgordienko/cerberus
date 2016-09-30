import { Component, OnInit } from '@angular/core';
import {EndPointsServiceService} from './end-points-service.service';
import {IEndPoint} from './iend-point';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EndPointsServiceService]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  myLabel = 'Select a number';
  myValue = '4';
  myItems = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  /**
   * Точки подключения и обслуживания
   * 
   * @type {IEndPoint[]}
   * @memberOf AppComponent
   */
  endpoints: IEndPoint[];
  constructor(){
    
  }
  ngOnInit() {

  }
}
