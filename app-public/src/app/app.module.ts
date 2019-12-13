import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import {APP_BASE_HREF} from '@angular/common';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from "./auth.guard";
import {HTTP_INTERCEPTORS } from "@angular/common/http";
import {TokenInterceptorService} from "./token-interceptor.service";
import {Framework} from "passport";
import {FrameworkComponent} from "./framework/framework.component";
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarRequestComponent } from './details/calendar-request/calendar-request.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BooklistComponent } from './booklist/booklist.component';
import { BookdetailsComponent } from './bookdetails/bookdetails.component';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    HomepageComponent,
    HeaderComponent,
    FrameworkComponent,
    CreateComponent,
    DetailsComponent,
    CalendarRequestComponent,
    BooklistComponent,
    BookdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'stdrequest/:stdrequestid',
        component:DetailsComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'book/:bookid',
        component: BookdetailsComponent,
        canActivate:[AuthGuard]
      },
      {
        path: 'books',
        component: BooklistComponent,
        canActivate:[AuthGuard]
      }
    ]),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/'},AuthGuard,{provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi: true}],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
