import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FlightSearchComponent } from '../components/flight-search/flight-search.component';
import { ConfirmationPageComponent } from '../components/confirmation-page/confirmation-page.component';
import { ChooseSeatsComponent } from '../components/choose-seats/choose-seats.component';
import { SearchResultsComponent } from '../components/search-results/search-results.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: FlightSearchComponent },
  { path: 'results', component: SearchResultsComponent },
  { path: 'seats', component: ChooseSeatsComponent },
  { path: 'confirmation', component: ConfirmationPageComponent },
  { path: '**', component: FlightSearchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
