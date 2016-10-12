import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru.js';
import { UsersHistoryServiceService } from '../users-history-service.service';
import { CurrentLicenseServiceService } from '../current-license-service.service';
import { IDistributorUser, DistributorUser } from '../idistributor-user';
import { IDistributorLicenceInfo } from '../idistributor-licence-info';
import { ILicenseInfo } from '../ilicense-info';
import { CurrentUsersServiceService } from '../current-users-service.service';

import { asEnumerable } from 'linq-es2015';



@Component({
  selector: 'app-history-status-component',
  templateUrl: './history-status-component.component.html',
  styleUrls: ['./history-status-component.component.css'],
  providers: [UsersHistoryServiceService, CurrentLicenseServiceService, CurrentUsersServiceService]
})
export class HistoryStatusComponentComponent implements OnInit {


  private url: string;
  /**
   * Источник данных для грида с подключенными пользователями
   * 
   * @private
   * @type {IDistributorUser}
   * @memberOf HistoryStatusComponentComponent
   */
  private gridDataSet: IDistributorUser[];

  private optionsLineGraph: HighchartsOptions;
  private optionsPieGraph: HighchartsOptions;

  private allLicense: number;
  private usedLicense: number;
  private allUsers: number;

  public Users: IDistributorUser[];

  public currentUserCount: number;
  public currentUserFilteredCount: number;
  private begin: Date = moment().toDate();
  private end: Date = moment().toDate();
  public beginValue: string = moment(this.begin).format('l');
  public endValue: string = moment(this.begin).format('l');
  private License: ILicenseInfo;

  constructor(private history: UsersHistoryServiceService, private current: CurrentLicenseServiceService,
    private users: CurrentUsersServiceService) { }


  /**
   * Получение текущих поключенных пользователей
   * @private
   * 
   * @memberOf HistoryStatusComponentComponent
   */
  private getCurrentLicence() {
    this.current.getCurrentLicense(this.url).then((result: ILicenseInfo) => {
      this.License = result;
      this.allLicense = result.LicCount;
      this.allUsers = result.ActiveLicCount;
    });
  };

  /**
   * Получение данных для построения линейного графика подключений пользователей за день
   * 
   * @private
   * 
   * @memberOf HistoryStatusComponentComponent
   */
  private getLineCahartData() {

  }
  /**
   * Получение данных для построения круговой диаграммы статуса текущих подключенных пользователей
   * 
   * @private
   * 
   * @memberOf HistoryStatusComponentComponent
   */
  private getPieChartData() {
    this.current.getCurrentLicense(this.url).then((l: ILicenseInfo) => {
      this.License = l;
          /**
   * Получение текщих подключенных лицензий
   */
    this.users.getCurrentLicenceStatus(this.url).then((result: IDistributorUser[]) => {

      let users: IDistributorUser[] = [];
      moment.locale('rus');
      result.forEach(element => {
        let user = new DistributorUser();
        user.LoginName = element.LoginName;
        user.LogonTime = moment(element.LogonTime).fromNow();
        user.PersonId = element.PersonId;
        user.UserKey = element.UserKey;
        users.push(user);
      });
      this.currentUserCount = users.length;
      this.usedLicense = users.length;

      /**
       * Конфигурация круговой диаграммы по состоянию лицензирования
       */
      this.optionsPieGraph = {
        colors: ['#FF4081', '#3F51B5'],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: this.License.Description

        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{series.name} {point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: 'black'
              }
            }
          }
        },
        series: [{
          name: 'Лицензий',
          data: [{
            name: 'использовано',
            y: this.usedLicense
          }, {
            name: 'осталось',
            y: this.allLicense,
            sliced: true,
            selected: true
          }]
        }]
      };
    });
    }).catch((exception) => console.log(exception));


  }



  /**
   * Получение текущих подключенных пользователей
   * 
   * @private
   * 
   * @memberOf HistoryStatusComponentComponent
   */
  private getLicences() {
    /**
     * Получение текщих подключенных лицензий
     */
    this.users.getCurrentLicenceStatus(this.url).then((result: IDistributorUser[]) => {
      let users: IDistributorUser[] = [];
      moment.locale('rus');
      result.forEach(element => {
        let user = new DistributorUser();
        user.LoginName = element.LoginName;
        user.LogonTime = moment(element.LogonTime).fromNow();
        user.PersonId = element.PersonId;
        user.UserKey = element.UserKey;
        users.push(user);
      });
      this.Users = users;
      this.gridDataSet = users;
      this.currentUserCount = this.currentUserFilteredCount = users.length;
      this.usedLicense = users.length;

      /**
       * Конфигурация круговой диаграммы по состоянию лицензирования
       */
      this.optionsPieGraph = {
        colors: ['#FF4081', '#3F51B5'],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: this.License.Description

        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{series.name} {point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: 'black'
              }
            }
          }
        },
        series: [{
          name: 'Лицензий',
          data: [{
            name: 'использовано',
            y: this.usedLicense
          }, {
            name: 'осталось',
            y: this.allLicense,
            sliced: true,
            selected: true
          }]
        }]
      };

    });
  }

  /**
  * Получение текщих подключенных пользователей
  */
  private GetCurrentConnectedUsers() {
    this.users.getCurrentLicenceStatus(this.url).then((result: IDistributorUser[]) => {
      let users: IDistributorUser[] = [];
      moment.locale('rus');
      result.forEach(element => {
        let user = new DistributorUser();
        user.LoginName = element.LoginName;
        user.LogonTime = moment(element.LogonTime).fromNow();
        user.PersonId = element.PersonId;
        user.UserKey = element.UserKey;
        users.push(user);
      });
      /**
       * Все пользователи загруженные в форму с данными
       */
      this.Users = users;
      this.gridDataSet = users;
      this.currentUserCount = this.currentUserFilteredCount = users.length;
      this.usedLicense = users.length;

      /**
       * Конфигурация круговой диаграммы по состоянию лицензирования
       */
      this.optionsPieGraph = {
        colors: ['#FF4081', '#3F51B5'],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: this.License.Description

        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{series.name} {point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: 'black'
              }
            }
          }
        },
        series: [{
          name: 'Лицензий',
          data: [{
            name: 'использовано',
            y: this.usedLicense
          }, {
            name: 'осталось',
            y: this.allLicense,
            sliced: true,
            selected: true
          }]
        }]
      };

    });
  }

  /**
   * Получение всех пользователей
   */
  private GeUsers(url, bd, ed) {

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
      this.gridDataSet = users;
      this.currentUserCount = this.currentUserFilteredCount = users.length;
    }).catch(exeption => console.log(exeption));
  }

  /**
 * Получение информации о пользовательских лицензиях
 */
  private GetLicencesInfo(url, bd, ed) {

    this.history.getUsersLicenseInfo(url, bd, ed).then((result: IDistributorLicenceInfo[]) => {
      let data: [number, number][] = [];
      let rslt: [moment.Moment, number][] = [];
      for (let index = 0; index < result.length; index++) {
        let element = result[index];
        let dt = moment(element.Time);
        let cnt = element.Count;
        rslt.push([dt, cnt]);
      }
      result.forEach(element => {
        let dateValue = +moment(element.Time);
        let countValue = element.Count;
        data.push([dateValue, countValue]);
      });
      this.optionsLineGraph = {
        chart: {
          zoomType: 'xy'
        },
        title: { text: 'На дату: ' + moment(this.begin).format('dddd, Do MMMM') },
        series: [{
          type: 'line',
          data: data
        }],
        xAxis: {
          type: 'datetime',
        }
      };

    });
  }

  ngOnInit() {
    this.begin.setHours(0, 0, 0, 0);
    let bd = this.toDate(this.begin);
    let ed = this.toDate(this.end);
    let url = 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc';
    this.url = url;
    this.getPieChartData();
    // this.getCurrentLicence();
    // this.getLicences();
    // this.GeUsers(url, bd, ed);
    // this.GetCurrentConnectedUsers();
    // this.GetLicencesInfo(url, bd, ed);
  }

  /**
   * Сортировка
   * 
   * @param {*} event
   * 
   * @memberOf HistoryStatusComponentComponent
   */
  sortUsers(event: any) {
    const grid = event.target;
    const sortOrder = grid.sortOrder[0];
    const sortProperty = grid.columns[sortOrder.column].name;
    const sortDirection = sortOrder.direction;
    this.gridDataSet.sort((a, b) => {
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

  /**
   * Фильтрация
   * 
   * @param {*} event
   * 
   * @memberOf HistoryStatusComponentComponent
   */
  filterPeople(event: any) {
    const filterText: string = (<HTMLInputElement>event.target).value.toLowerCase();
    this.gridDataSet = this.Users.filter((person: IDistributorUser) =>
      !filterText || person.LoginName.toLowerCase().indexOf(filterText) > -1
    );
    this.currentUserFilteredCount = this.gridDataSet.length;
  }

  /**
   * Преобразование врмени в нужный формат отображения
   * 
   * @param {any} jsDate
   * @returns {string}
   * 
   * @memberOf HistoryStatusComponentComponent
   */
  toDate(jsDate): string {
    let jsdate = jsDate || new Date();
    let timezoneOffset = jsdate.getTimezoneOffset() / (60 * 24);
    let msDateObj = (jsdate.getTime() / 86400000) + (25569 - timezoneOffset);
    return msDateObj.toString();
  }
}
