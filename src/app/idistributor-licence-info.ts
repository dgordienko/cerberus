/**
 *  Интерфейс данных для графика ретроспективы использования лицензий
 * 
 * @export
 * @interface IDistributorLicenceInfo
 */
export interface IDistributorLicenceInfo {
    /**
     *  Кол-во использванных лицензий
     * 
     * @type {number}
     * @memberOf IDistributorLicenceInfo
     */
    Count: number;
    /**
     * 
     * 
     * @type {Date}
     * @memberOf IDistributorLicenceInfo
     */
    Time: Date;
}
