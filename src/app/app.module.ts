import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { ChartModule } from 'angular2-highcharts';
import { MomentModule } from 'angular2-moment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    PolymerElement('vaadin-date-picker'),
    PolymerElement('paper-menu'),
    PolymerElement('paper-item'),
    PolymerElement('paper-input'),
    PolymerElement('iron-pages'),
    PolymerElement('paper-spinner'),
    AppComponent
  ],
  imports: [
    MomentModule,
    ChartModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
