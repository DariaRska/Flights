import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ChooseSeatsComponent } from './components/choose-seats/choose-seats.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { BackgroundImgComponent } from './components/background-img/background-img.component';
import { ConfirmationPageComponent } from './components/confirmation-page/confirmation-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApiDataService } from './services/api-data.service';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FlightSearchComponent,
    SearchResultsComponent,
    ChooseSeatsComponent,
    LoginPageComponent,
    FooterComponent,
    BackgroundImgComponent,
    ConfirmationPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [ApiDataService, UserService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
