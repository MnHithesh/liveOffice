import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatTooltipModule,
  MatSnackBarModule, MatToolbarModule, MatSidenavModule, MatListModule, MatMenuModule, MatButtonToggleModule,
  MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatGridListModule,MatSelectModule,MatAutocompleteModule,
  MatBadgeModule,MatChipsModule,
} from '@angular/material';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SchedulingComponent } from './scheduling/scheduling.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateEventComponent } from './Modals/create-event/create-event.component';
// import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService, EventSettingsModel} from '@syncfusion/ej2-angular-schedule';
import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    SideBarComponent,
    SchedulingComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    // NgbModule,
    HttpModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatChipsModule,
    FullCalendarModule,
    MatChipsModule,
    // ScheduleModule, RecurrenceEditorModule,
    // FullCalendarModule,
  ],
  entryComponents: [CreateEventComponent],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
