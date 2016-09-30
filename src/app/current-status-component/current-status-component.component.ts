import { Component, OnInit } from '@angular/core';
import { CurrentLicenseServiceService } from '../current-license-service.service';
import { CurrentUsersServiceService } from '../current-users-service.service';
import { ILicenseInfo } from '../ilicense-info';
import { IDistributorUser } from '../idistributor-user';

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

  constructor(
    private license: CurrentLicenseServiceService,
    private users: CurrentUsersServiceService) {
    this.url = 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc';
  }

  ngOnInit() {
    /**
     * Получение текущих лицензий
     */
    this.license.getCurrentLicense(this.url).then((result: ILicenseInfo) => { this.License = result; });
    /**
     * Получение текщих подключенных пользователей
     */
    this.users.getCurrentUsers(this.url).then((result: IDistributorUser[]) => { this.Users = result; });
  }
}
