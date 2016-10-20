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

import { TableOptions, SelectionType, TableColumn, ColumnMode } from 'angular2-data-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EndPointsService, LicenseStatusService]
})

export class AppComponent implements OnInit {

  rows = [];

  options = new TableOptions({
    columnMode: ColumnMode.force,
    headerHeight: 50,
    footerHeight: 0,
    rowHeight: 50,
    scrollbarV: true,
    scrollbarH: true
  });

  private loadedFlag: number = -1;

  private progressStatus: number = -1;

  private detailStatus: number = -1;


  private title: string;
  private heroes: IEndPoint[];
  private hero: IEndPoint;

  private selectedDatePoint;

  private begin: Date = moment().toDate();
  private end: Date = moment().toDate();

  private optionsLineGraph: Object;
  private optionPieChart: Object;
  /**
   * Все зарегистрированные лицензии
   */
  private allUsersLicences: IDistributorUser[] = [];

  private selectedLicensesInTime: IDistributorUser[] = [];
  /**
   * Общая информация о лицензировании точки подключения
   */
  private licenseInfo: ILicenseInfo;

  constructor(private endpoint: EndPointsService, private licenseStatus: LicenseStatusService) { };

  ngOnInit() {
    this.title = 'DistributorUser.Cerber';
    this.endpoint.getEndPoints().then((result: IEndPoint[]) => {
      this.heroes = result;
    });
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
    let lic: ILicenseInfo;
    let licinf;
    let userinfo;
    this.progressStatus = 1;
    Promise.all([
      this.licenseStatus.getCurrentLicense(url),
      this.licenseStatus.getUsersLicenseInfo(url, begin, end),
      this.licenseStatus.getUseLicensedHistoty(url, begin, end)])
      .then((result) => {
        [lic, licinf, userinfo] = result;
        this.licenseInfo = result[0];
        let data: [number, number][] = [];
        result[1].forEach((inf: IDistributorLicenceInfo) => {
          let count = inf.Count;
          let d = Number.parseInt(moment(inf.Time).add('h', 3).format('x'));
          data.push([d, count]);
        });
        moment.locale('rus');
        this.optionsLineGraph = this.configLineGraph(data);
        this.optionPieChart = this.configPieChar(this.licenseInfo);
        this.allUsersLicences = (result[2] as IDistributorUser[]);
        this.loadedFlag = 1;
        this.progressStatus = -1;
      }).catch((x) => console.table(x));
  }

  /**
   * Перестроить все заново
   *
   * @param {*} value
   *
   * @memberOf AppComponent
   */
  public onSelect(value: any): void {
    this.hero = value;
    this.title = this.hero.title;
    this.begin.setHours(0, 0, 0, 0);
    let bd = this.toDate(this.begin);
    let ed = this.toDate(this.end);
    this.loadedFlag = -1;
    this.detailStatus = -1;
    this.buildDashBoard(this.hero.url, bd, ed);
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

  /**
   *  Конфигурация круговой диграммы использования лицензий
   */
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

  /**
   * Конфигурация линейного графика
   *
   * @private
   * @param {any} data
   * @returns {*}
   *
   * @memberOf AppComponent
   */
  private configLineGraph(data): any {
    let date = moment().format('lll');
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
    let users = this.allUsersLicences.AsLinq<IDistributorUser>().Where((value: IDistributorUser) =>
      ((moment(value.LogoffTime).toDate() >= endTime))
      && (moment(value.LogonTime).toDate() <= endTime)).ToArray();
    this.selectedLicensesInTime = users;
    this.rows = users;
    console.table(this.rows);
    this.licenseInfo.ActiveLicCount = users.length;
    this.detailStatus = 1;
  }
}
