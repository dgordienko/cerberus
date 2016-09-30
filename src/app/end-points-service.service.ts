import { Injectable } from '@angular/core';
import { IEndPoint } from './iend-point';

/**
 * Точка подключения
 * 
 * @export
 * @class EndPoint
 * @implements {IEndPoint}
 */
 class EndPoint implements IEndPoint {
  id: number;
  title: string;
  url: string;
}
/**
 * Сужествующие точки подключения и обслуживания
 */
export const EndPoints: IEndPoint[] = [
  { id: 0, title: 'Караван-Сарай', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
  { id: 1, title: 'Макинвест', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
  { id: 2, title: 'Лазурит', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
  { id: 3, title: 'ЧП Алексеев В.В.', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
  { id: 4, title: 'Торговый дом Купец', url: 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc' },
];

@Injectable()
export class EndPointsServiceService {
  constructor() { }
  getEndPoints(): Promise<IEndPoint[]> {
    return Promise.resolve(EndPoints);
  }
}
