import { Component, OnInit } from '@angular/core';
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
  providers: [CurrentLicenseServiceService, CurrentUsersServiceService]
})

export class CurrentStatusComponentComponent implements OnInit {
  private url: string;

  /**
   * Текущие лицензии
   */
  public License: ILicenseInfo;

  /**
   * Текущие подключенные пользователи
   */
  public Users: IDistributorUser[];
  public displayedUsers: IDistributorUser[];

  public chartlabels: string[] = ['Активно', 'Всего'];
  public chartdata: number[] = [10, 1000];
  public chartype: string = 'pie';

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
      this.chartdata[0] = result.ActiveLicCount;
      this.chartdata[1] = result.LicCount;
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
        user.LogonTime = moment(element.LogonTime).format('dddd, Do MMMM, hh:mm').toString();
        user.LogoffTime = moment(element.LogoffTime).format('dddd, Do MMMM, hh:mm').toString();
        user.PersonId = element.PersonId;
        user.UserKey = element.UserKey;
        users.push(user);
      });
      this.Users = users;
      this.displayedUsers = users;
    });
  }

  sortUsers(event: any) {

    const grid = event.target;
    event.preventDefault();
    let idx = grid.sortOrder[0].column;
    let lesser = grid.sortOrder[0].direction === 'asc' ? -1 : 1;
    this.displayedUsers.sort(function (a, b) {
      return (a[idx] < b[idx]) ? lesser : -lesser;
    });
  }

  filterPeople(event: any) {
    const filterText: string = (<HTMLInputElement>event.target).value.toLowerCase();
    this.displayedUsers = this.Users.filter((person: IDistributorUser) =>
      !filterText || person.LoginName.toLowerCase().indexOf(filterText) > -1
    );
  }
}
