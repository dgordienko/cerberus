import { Injectable } from '@angular/core';
import { IEndPoint } from '../intrf/iend-point';

export const EndPoints: IEndPoint[] = [
  { id: 0, title: 'Караван-Сарай', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
  { id: 1, title: 'Макинвест', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
  { id: 2, title: 'Лазурит', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
  { id: 3, title: 'ЧП Алексеев В.В.', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
  { id: 4, title: 'Торговый дом Купец', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
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
