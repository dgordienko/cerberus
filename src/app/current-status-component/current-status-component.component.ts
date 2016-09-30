import { Component, OnInit } from '@angular/core';
import { CurrentLicenseServiceService } from '../current-license-service.service';
import {ILicenseInfo} from '../ilicense-info';
@Component({
  selector: 'app-current-status-component',
  templateUrl: './current-status-component.component.html',
  styleUrls: ['./current-status-component.component.css'],
  providers: [CurrentLicenseServiceService]
})
export class CurrentStatusComponentComponent implements OnInit {

  private lurl: string;
  private service: CurrentLicenseServiceService;
  License: ILicenseInfo;
  constructor() {
    this.lurl = 'http://91.222.246.133:8085/distributor.cerber/DistributorCerber.svc';
   }

  ngOnInit() {
     let url = this.lurl + '/api/cerber/licences';
    this.service.getCurrentLicense(url).subscribe((result: ILicenseInfo) => {
      console.log(result);
      this.License = result;
    });
  }
}
