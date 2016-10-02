import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { PolymerElement } from '@vaadin/angular2-polymer';

import { AppComponent } from './app.component';
import { CurrentStatusComponentComponent } from './current-status-component/current-status-component.component';
import { HistoryStatusComponentComponent } from './history-status-component/history-status-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PolymerElement('vaadin-date-picker'),
    PolymerElement('vaadin-grid'),
    CurrentStatusComponentComponent,
    HistoryStatusComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
