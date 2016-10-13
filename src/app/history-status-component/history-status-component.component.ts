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

  /**
   * Конфигурация графика с ретроспективой подключений
   */
  private optionsLineGraph: Object;
  /**
   * Конфигурация графика с текущим состоянием лицензирования
   */
  private optionsPieGraph: HighchartsOptions;
  /**
   * Всего лицензий
   */
  private allLicense: number;
  /**
   * Лицензий использовано
   */
  private usedLicense: number;
  /**
   * Текущие использованные лицензии for users
   */
  public Licences: IDistributorUser[];
  /**
   *
   */
  public currentUserCount: number;
  public currentUserFilteredCount: number;
  /**
   * Начало периода
   */
  private begin: Date = moment().toDate();
  /**
   * Окончание периода
   */
  private end: Date = moment().toDate();
  /**
   * Отформатированное значение начала периода
   */
  public beginValue: string = moment(this.begin).format('l');
  /**
   * Отформатрованное значение окончания периода
   */
  public endValue: string = moment(this.begin).format('l');
  /**
   * Информация о лицензии конечной точки
   */
  private EndPointLicense: ILicenseInfo;

  selectedDatePoint: number;

  constructor(
    private history: UsersHistoryServiceService,
    private current: CurrentLicenseServiceService,
    private users: CurrentUsersServiceService) { }
  /**
   * Получение данных для построения линейного графика подключений пользователей за выбранный интервал дат
   *
   * @private
   *
   * @memberOf HistoryStatusComponentComponent
   */
  private getLineCahartData(url, bd, ed) {

    // this.current.getCurrentLicense(url).then((result: ILicenseInfo) => {
    //   this.allLicense = this.EndPointLicense.LicCount = result.LicCount;
    //   this.EndPointLicense = result;
    // });

    this.history.getUseLicensedHistoty(url, bd, ed).then((result: IDistributorUser[]) => {
      console.log('getUseLicensedHistoty');
      console.log(result);
      this.usedLicense = result.length;
    });

      this.current.getCurrentLicense(url).then((result: ILicenseInfo) => {
        console.log('getCurrentLicense');
        console.log(result);
        this.allLicense = this.EndPointLicense.LicCount = result.LicCount;
        this.EndPointLicense = result;
    });

    this.history.getUsersLicenseInfo(url, bd, ed).then((result: IDistributorLicenceInfo[]) => {
      let data: [number, number][] = [];
      let rslt: [moment.Moment, number][] = [];
      for (let index = 0; index < result.length; index++) {
        let element = result[index];
        let dt = moment(element.Time).utc();
        let cnt = element.Count;
        rslt.push([dt, cnt]);
      }
      result.forEach(element => {
        let dateValue = Number.parseInt(moment(element.Time).add('h', 3).format('x'));
        let countValue = element.Count;
        data.push([dateValue, countValue]);
      });


      moment.locale('rus');
      this.optionsLineGraph = {
        chart: {
          zoomType: 'xy'
        },
        title: { text: 'На дату: ' + moment(this.end).format('dddd, Do MMMM , hh:mm') },
        series: [{
          name: 'Лицензии',
          type: 'line',
          data: data,
          allowPointSelect: true
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
    // this.getPieChartData();
    this.getLineCahartData(url, bd, ed);
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
    this.gridDataSet = this.Licences.filter((person: IDistributorUser) =>
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

  /**
   * Выделение полученной точки на грфике и формирование запроса для элементов
   * отображенных в гриде
   */
  onPointSelect(e) {
    this.selectedDatePoint = e.context.x;
    console.log(moment(this.selectedDatePoint).add('h', -3));
  }
}
