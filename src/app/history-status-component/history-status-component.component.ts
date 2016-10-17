import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru.js';
import { UsersHistoryServiceService } from '../users-history-service.service';
import { CurrentLicenseServiceService } from '../current-license-service.service';
import { IDistributorUser } from '../idistributor-user';
import { IDistributorLicenceInfo } from '../idistributor-licence-info';
import { ILicenseInfo } from '../ilicense-info';
import { CurrentUsersServiceService } from '../current-users-service.service';
import '../linq';

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
  private usersLicense: number;
  /**
   * Текущие использованные лицензии for users
   */
   Licences: IDistributorUser[];
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
   * Получение данных для построения линейного графика подключений пользователей
   *
   * @private
   *
   * @memberOf HistoryStatusComponentComponent
   */
  private getDashBoardData(url, bd, ed) {
    let usedLicensed = this.history.getUseLicensedHistoty(url, bd, ed);
    let currentStatus = this.current.getCurrentLicense(url);
    let currentUsers = this.history.getUsersLicenseInfo(url, bd, ed);
    let used: IDistributorUser[];
    let current: ILicenseInfo;
    let users: IDistributorLicenceInfo[];
    Promise.all([usedLicensed, currentStatus, currentUsers]).then((result) => {

      // magic! неявный вызов map
      moment.locale('rus');
      [used, current, users] = result;

      // Текущее состояние лицензий  
      let activeLicense = result[0].AsLinq().Where((x: IDistributorUser) => x.LogoffTime = null).ToArray();
      let q11 = result[0].AsLinq().Select(x => x.PersonId).Distinct().ToArray();
      let activeUsers = q11.length;
      this.usersLicense = activeUsers;
      this.EndPointLicense = result[1];
      this.usedLicense = activeLicense.length;
      this.usersLicense = activeUsers;
      this.allLicense = result[1].LicCount;
      let data: [number, number][] = [];

      let rslt: [Date, number, Date, number][] = [];

      result[2].forEach(x => {
        let dateValue = moment(x.Time).toDate();
        let count = x.Count;
        let d = Number.parseInt(moment(dateValue).format('x'));
        rslt.push([dateValue, count, moment(d).toDate(), d]);
      });

      console.table(rslt);

      result[2].forEach(element => {
        let count = element.Count;
        let d = Number.parseInt(moment(element.Time).add('h', 3).format('x'));
        data.push([d, count]);
      });

      this.usedLicense = result[0].AsLinq().Count();
      let q: IDistributorUser[] = result[0].AsLinq().ToArray();
      q.forEach((element: IDistributorUser) => {
        if ( element.LogoffTime != null) {
          element.LogoffTime = moment(element.LogoffTime).format('dddd Do HH:mm:ss');
        } else {
          element.LogoffTime = `Зарегистрирован ${moment(element.LogonTime).fromNow()}`;
        };
        element.LogonTime = moment(element.LogonTime).format('dddd Do HH:mm:ss');
      });
      // активные подключенные пользоваоели системы      
      this.Licences = q;
      // Конфигурация графиков
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
      this.optionsPieGraph = {
        colors: ['#FF4081', '#3F51B5'],
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
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
    }).catch(exception => console.log(exception));
  }
  ngOnInit() {
    this.begin.setHours(0, 0, 0, 0);
    let bd = this.toDate(this.begin);
    let ed = this.toDate(this.end);
    let url = 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc';
    // let url = 'http://193.110.115.195:8090/distributor.cerber/DistributorCerber.svc';
    this.url = url;
    this.getDashBoardData(url, bd, ed);
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
