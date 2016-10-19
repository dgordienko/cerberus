import { IDistributorUser } from './intrf/idistributor-user';
// import { element } from 'protractor/globals';
import { Component, OnInit } from '@angular/core';
import { EndPointsService } from './services/end-points.service';
import { LicenseStatusService } from './services/license-status.service';
import { IEndPoint } from './intrf/iend-point';
import { ILicenseInfo } from './intrf/ilicense-info';
import { IDistributorLicenceInfo } from './intrf/idistributor-licence-info';

import * as moment from 'moment';
import 'moment/locale/ru.js';
import './sys/linq';

class Person {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EndPointsService, LicenseStatusService]
})

export class AppComponent implements OnInit {

  private url: string;
  private title: string;
  private heroes: IEndPoint[];
  private hero: IEndPoint;
  private lineChartDataSource;
  private selectedDatePoint;

  private begin: Date = moment().toDate();
  private end: Date = moment().toDate();

  private optionsLineGraph: Object;
  private optionsPieChart: Object;

  private allLicense: number;
  /**
   * Все зарегистрированные лицензии
   */
  private allUsersLicences: IDistributorUser[];
  private selectedLic: IDistributorUser[];
  /**
   * Общая информация о лицензировании точки подключения
   */
  private licenseInfo: ILicenseInfo;

  constructor(private endpoint: EndPointsService, private licenseStatus: LicenseStatusService) { };

  ngOnInit() {
    this.begin.setHours(0, 0, 0, 0);
    let bd = this.toDate(this.begin);
    let ed = this.toDate(this.end);
    this.buildDashBoard('http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc', bd, ed);
  }
  /**
   * Построение отображения состояния лицензий для выбранного элемента меню
   *
   * @private
   * @param {string} url
   *
   * @memberOf AppComponent
   */
  private buildDashBoard(url: string, begin, end) {

    let end_points: IEndPoint[];
    let lic: ILicenseInfo;
    let licinf;
    let userinfo;

    Promise.all([

      this.endpoint.getEndPoints(),
      this.licenseStatus.getCurrentLicense(url),
      this.licenseStatus.getUsersLicenseInfo(url, begin, end),
      this.licenseStatus.getUseLicensedHistoty(url, begin, end)

    ]).then((result) => {
      [end_points, lic, licinf, userinfo] = result;

      this.url = result[0][0].url;
      this.heroes = result[0];
      this.hero = result[0][0];
      this.title = this.hero.title;
      this.licenseInfo = result[1];

      this.allLicense = this.licenseInfo.LicCount;

      this.lineChartDataSource = result[2];
      let data: [number, number][] = [];
      result[2].forEach((inf: IDistributorLicenceInfo) => {
        let count = inf.Count;
        let d = Number.parseInt(moment(inf.Time).add('h', 3).format('x'));
        data.push([d, count]);
      });
      moment.locale('rus');
      this.optionsLineGraph = this.configLineGraph(data);
      let licData = this.licenseInfo;
      this.optionsPieChart = this.configPieChar(licData);
      this.allUsersLicences = (result[3] as IDistributorUser[]);
    }).catch((x) => console.table(x));
  }

  public onSelect(value: any): void {
    this.hero = value;
    this.title = this.hero.title;
  }

  /**
 * Преобразование врмени в нужный формат отображения
 *
 * @param {any} jsDate
 * @returns {string}
 *
 * @memberOf HistoryStatusComponentComponent
 */
  private toDate(jsDate): string {
    let jsdate = jsDate || new Date();
    let timezoneOffset = jsdate.getTimezoneOffset() / (60 * 24);
    let msDateObj = (jsdate.getTime() / 86400000) + (25569 - timezoneOffset);
    return msDateObj.toString();
  }
  private configPieChar(data: ILicenseInfo): Object {
    console.table(data);
    return {
      colors: ['#FF4081', '#3F51B5'],
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: ' '
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
          y: data.ActiveLicCount
        }, {
          name: 'осталось',
          y: data.LicCount,
          sliced: true,
          selected: true
        }]
      }]
    };
  };

  private configLineGraph(data): any {
    let date = moment().format('lll');
    // Конфигурация графиков
    let optionsLineGraph = {
      chart: {
        zoomType: 'xy'
      },
      title: { text: `На дату:  ${date}` },
      series: [{
        name: this.licenseInfo.Description,
        type: 'line',
        data: data,
        allowPointSelect: true
      }],
      xAxis: {
        type: 'datetime',
      }
    };
    return optionsLineGraph;
  }

  onPointSelect(e) {
    this.selectedDatePoint = e.context.x;
    let endTime = moment(this.selectedDatePoint).add('h', -3).toDate();
    console.log(endTime);
    let users = this.allUsersLicences.AsLinq<IDistributorUser>().Where((value: IDistributorUser) =>
      (moment(value.LogoffTime).toDate() >= endTime)
      && (moment(value.LogonTime).toDate() <= endTime)).ToArray();
    this.selectedLic = users;
    console.table(this.allUsersLicences);
    console.table(users);
  }
}
