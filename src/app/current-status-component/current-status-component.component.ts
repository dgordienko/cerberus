import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CurrentLicenseServiceService } from '../current-license-service.service';
import { CurrentUsersServiceService } from '../current-users-service.service';
import { ILicenseInfo } from '../ilicense-info';
import { IDistributorUser, DistributorUser } from '../idistributor-user';
import * as moment from 'moment';
import 'moment/locale/ru.js';


@Component({
  selector: 'app-current-status-component',
  templateUrl: './current-status-component.component.html',
  styleUrls: ['./current-status-component.component.css'],
  providers: [CurrentLicenseServiceService, CurrentUsersServiceService],
  encapsulation: ViewEncapsulation.None
})

export class CurrentStatusComponentComponent implements OnInit {
  private url: string;

  /**
   * Текущие лицензии
   */
  private License: ILicenseInfo;

  /**
   * Текущие подключенные пользователи
   */
  private Users: IDistributorUser[];
  private displayedUsers: IDistributorUser[];

  // private chartlabels: string[] = ['Активно', 'Всего'];
  // private chartdata: number[] = [10, 1000];
  // private chartype: string = 'pie';

  private currentUserCount: number;
  private currentUserFilteredCount: number;


  /**
   *Всего лицензий
   *
   * @type {number}
   * @memberOf CurrentStatusComponentComponent
   */
  private allLicense: number;

  /**
   *Использовано лицензий
   *
   * @type {number}
   * @memberOf CurrentStatusComponentComponent
   */
  private usedLicense: number;

  /**
   *Всего пользователей
   *
   * @type {number}
   * @memberOf CurrentStatusComponentComponent
   */
  private allUsers: number;

  /**
   *Конфигурация диаграммы активных лицензий
   *
   * @private
   * @type {HighchartsOptions}
   * @memberOf CurrentStatusComponentComponent
   */
  private options: HighchartsOptions;

  constructor(
    private license: CurrentLicenseServiceService, private users: CurrentUsersServiceService) {
    this.url = 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc';
  }
  ngOnInit() {
    /**
     * Получение текущих лицензий
     */
    this.license.getCurrentLicense(this.url).then((result: ILicenseInfo) => {
      this.License = result;
      this.allLicense = result.LicCount;
      this.allUsers = result.ActiveLicCount;
    });

    /**
     * Получение текщих подключенных пользователей
     */
    this.users.getCurrentUsers(this.url).then((result: IDistributorUser[]) => {
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
      this.displayedUsers = users;
      this.currentUserCount = this.currentUserFilteredCount = users.length;
      this.usedLicense = users.length;

      /**
       * Конфигурация круговой диаграммы по состоянию лицензирования
       */
      this.options = {
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
   *Сортировка таблици подключенных пользователей
   *
   * @param {*} event
   *
   * @memberOf CurrentStatusComponentComponent
   */
  sortUsers(event: any) {
    const grid = event.target;
    event.preventDefault();
    let idx = grid.sortOrder[0].column;
    let lesser = grid.sortOrder[0].direction === 'asc' ? -1 : 1;
    this.displayedUsers.sort(function (a, b) {
      return (a[idx] < b[idx]) ? lesser : -lesser;
    });
  }

  /**
   *Фильтрация таблици подключенных пользователей
   *
   * @param {*} event
   *
   * @memberOf CurrentStatusComponentComponent
   */
  filterPeople(event: any) {
    const filterText: string = (<HTMLInputElement>event.target).value.toLowerCase();
    this.displayedUsers = this.Users.filter((person: IDistributorUser) =>
      !filterText || person.LoginName.toLowerCase().indexOf(filterText) > -1
    );
    this.currentUserFilteredCount = this.displayedUsers.length;
  }
}
