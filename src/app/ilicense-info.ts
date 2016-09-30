export interface ILicenseInfo {
      /**
   *  Количество активных задействованных лицензий
   * 
   * @type {number}
   * @memberOf ILicensesInfo
   */
  ActiveLicCount?: number;
  /**
   * Общее колличество выданных лицензий
   * 
   * @type {number}
   * @memberOf ILicensesInfo
   */
  LicCount?: number;
  /**
   * 
   * Наименование подключенной точки обслуживания
   * @type {string}
   * @memberOf ILicensesInfo
   */
  Description?: string;
}
