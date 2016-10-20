import { Injectable } from '@angular/core';
import { IEndPoint } from '../intrf/iend-point';

export const EndPoints: IEndPoint[] = [
  { id: 0, title: 'Караван-Сарай', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
  { id: 1, title: 'Макинвест', url: 'http://193.23.58.37:8090/distributor.cerber/DistributorCerber.svc' },
  { id: 2, title: 'Лазурит', url: 'http://94.154.220.108:9501/distributor.cerber/distributorcerber.svc' },
  { id: 3, title: 'ЧП Алексеев В.В.', url: 'http://193.110.115.195:8090/distributor.cerber/DistributorCerber.svc' },
  { id: 4, title: 'ЧП Хлебников А.А.', url: 'http://91.193.253.64:8089/distributor.cerber/DistributorCerber.svc' },
  { id: 5, title: 'Торговый дом Купец', url: 'http://91.201.177.181:8085/distributor.cerber/DistributorCerber.svc' },
];

/**
 * Сервис работы с точками обслуживания
 */
@Injectable()
export class EndPointsService {

  constructor() { }
  /**
   * Получить точки облсуживания для построения меню
   */
  getEndPoints() {
    return Promise.resolve(EndPoints);
  }

}
