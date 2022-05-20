import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  faPlane = faPlane;

  flightsData: Array<any> = [];

  origin: string = '';
  destination: string = '';

  departureDate: string = '';
  returnDate: string = '';

  adults: any;
  infants: any;
  children: any;

  departureTime: any;
  arrivalTime: any;
  price: any[] = [];
  currency: any;

  originCountry: any;
  orginCountryIndex: any;
  destinationCountry: any;
  destinationIndex: any;

  returnDepartureTime: any;
  returnArrivalTime: any;

  showLuggageOptions: boolean = false;
  disabledBtn: boolean = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // origin and destination
    this.origin = this.userService.origin;
    this.destination = this.userService.destination;

    // date
    this.departureDate = this.userService.departureDate;
    this.returnDate = this.userService.returnDate;

    // time
    this.departureTime = this.userService.departureTime;
    this.arrivalTime = this.userService.arrivalTime;

    // people
    this.adults = this.userService.adults;
    this.infants = this.userService.infants;
    this.children = this.userService.children;

    // price and currency
    this.price.push(
      this.adults * parseInt(this.userService.price) +
        this.children * parseInt(this.userService.price) * 0.5
    );
    this.price.push(
      (this.adults * parseInt(this.userService.price) +
        this.children * parseInt(this.userService.price) * 0.5) *
        1.2
    );
    this.currency = this.userService.currency;

    // return time
    this.returnDepartureTime = this.userService.returnDepartureTime;
    this.returnArrivalTime = this.userService.returnArrivalTime;
  }

  showLuggage() {
    this.showLuggageOptions = true;
    this.userService.selectedPrice = 0;
    this.disabledBtn = true;
  }

  selectedLuggage(price: number) {
    this.showLuggageOptions = false;
    this.disabledBtn = false;
    this.userService.selectedPrice = price;
  }
}
