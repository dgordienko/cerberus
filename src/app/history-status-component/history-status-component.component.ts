import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru.js';
import { UsersHistoryServiceService } from '../users-history-service.service';
import { IDistributorUser } from '../idistributor-user';

@Component({
  selector: 'app-history-status-component',
  templateUrl: './history-status-component.component.html',
  styleUrls: ['./history-status-component.component.css'],
  providers: [UsersHistoryServiceService]
})
export class HistoryStatusComponentComponent implements OnInit {


  private begin: Date = moment(new Date()).add('day', 0).toDate();
  private end: Date = moment(new Date()).add('day', -5).toDate();

  constructor(private history: UsersHistoryServiceService) { }

  ngOnInit() {
    let bd = this.ToOADate(this.begin);
    let ed = this.ToOADate(this.end);
    let url = 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc/';
    console.log(url);
    this.history.getUsers(url, bd, ed).then((result: IDistributorUser[]) => {
      console.log(result);
    }).catch(exeption => console.log(exeption));
  }

  ToOADate(jsDate: any) {
    let jsdate = jsDate || new Date();
    let timezoneOffset = jsdate.getTimezoneOffset() / (60 * 24);
    let msDateObj = (jsdate.getTime() / 86400000) + (25569 - timezoneOffset);
    return msDateObj;
  };

}
