import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru.js';
import { UsersHistoryServiceService } from '../users-history-service.service';
import { IDistributorUser, DistributorUser } from '../idistributor-user';
import { IDistributorLicenceInfo } from '../idistributor-licence-info';

@Component({
  selector: 'app-history-status-component',
  templateUrl: './history-status-component.component.html',
  styleUrls: ['./history-status-component.component.css'],
  providers: [UsersHistoryServiceService]
})
export class HistoryStatusComponentComponent implements OnInit {


  /**
   *Конфигурация диаграммы активных лицензий
   *
   * @private
   * @type {HighchartsOptions}
   * @memberOf CurrentStatusComponentComponent
   */
  private options: HighchartsOptions;

  /**
   * Текущие подключенные пользователи
   */
  public Users: IDistributorUser[];
  public displayedUsers: IDistributorUser[];

  public currentUserCount: number;
  public currentUserFilteredCount: number;

  private begin: Date = moment().toDate();
  private end: Date = moment().toDate();

  public beginValue: string = moment(this.begin).format('l');
  public endValue: string = moment(this.begin).format('l');

  constructor(private history: UsersHistoryServiceService) { }

  ngOnInit() {
    this.begin.setHours(0, 0, 0, 0);
    let bd = this.toDate(this.begin);
    let ed = this.toDate(this.end);

    /**
     *locale development server
     */
    let url = 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc';
    // console.log(url);
    this.history.getUsers(url, bd, ed).then((result: IDistributorUser[]) => {
      let users: IDistributorUser[] = [];
      moment.locale('rus');
      result.forEach(element => {
        let user = new DistributorUser();
        user.LoginName = element.LoginName;
        user.LogonTime = moment(element.LogonTime).format('dddd, Do MMMM, hh:mm').toString();
        user.LogoffTime = moment(element.LogoffTime).format('dddd, Do MMMM, hh:mm').toString();
        user.PersonId = element.PersonId;
        user.UserKey = element.UserKey;
        users.push(user);
      });
      this.Users = users;
      this.displayedUsers = users;
      this.currentUserCount = this.currentUserFilteredCount = users.length;


    }).catch(exeption => console.log(exeption));

    this.history.getUsersLicenseInfo(url, bd, ed).then((result: IDistributorLicenceInfo[]) => {
      let data: [number, number][] = [];
      let rslt: [moment.Moment, number][] = [];

      for (let index = 0; index < result.length; index++) {
        let element = result[index];
        let dt = moment(element.Time);
        let cnt = element.Count;
        rslt.push([dt, cnt]);
      }
      console.log(rslt);
      result.forEach(element => {
        let dateValue = +moment(element.Time);
        let countValue = element.Count;
        data.push([dateValue, countValue]);
      });
      console.log(data);
      this.options = {
        chart: {
          zoomType: 'xy'
        },
        title: { text: 'На дату: ' + moment(this.begin).format('dddd, Do MMMM') },
        series: [{
          type: 'line',
          // name : 'Лицензии',          
          data: data
        }],
        xAxis: {
          type: 'datetime',
        }
      };

    });
  }

  sortUsers(event: any) {
    const grid = event.target;
    const sortOrder = grid.sortOrder[0];
    const sortProperty = grid.columns[sortOrder.column].name;
    const sortDirection = sortOrder.direction;
    this.displayedUsers.sort((a, b) => {
      let res: number;
      let valueA: string = grid.get(sortProperty, a),
        valueB: string = grid.get(sortProperty, b);
      if (!(valueA == null)) {
        res = parseInt(valueA, 10) - parseInt(valueB, 10);
      } else {
        res = valueA.localeCompare(valueB);
      }
      if (sortDirection === 'desc') {
        res *= -1;
      }
      return res;
    });
  }

  filterPeople(event: any) {
    const filterText: string = (<HTMLInputElement>event.target).value.toLowerCase();
    this.displayedUsers = this.Users.filter((person: IDistributorUser) =>
      !filterText || person.LoginName.toLowerCase().indexOf(filterText) > -1
    );
    this.currentUserFilteredCount = this.displayedUsers.length;
  }

  toDate(jsDate): string {
    let jsdate = jsDate || new Date();
    let timezoneOffset = jsdate.getTimezoneOffset() / (60 * 24);
    let msDateObj = (jsdate.getTime() / 86400000) + (25569 - timezoneOffset);
    return msDateObj.toString();
  }
}
