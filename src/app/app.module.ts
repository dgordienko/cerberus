import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { AppComponent } from './app.component';
import { HistoryStatusComponentComponent } from './history-status-component/history-status-component.component';
import { ChartModule } from 'angular2-highcharts';


@NgModule({
  declarations: [
    AppComponent,
    PolymerElement('vaadin-date-picker'),
    PolymerElement('vaadin-grid'),
    PolymerElement('paper-input'),
    PolymerElement('paper-badge'),
    PolymerElement('paper-button'),
    HistoryStatusComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
