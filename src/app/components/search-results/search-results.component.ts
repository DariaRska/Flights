import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
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
  price: any;
  currency: any;

  originCountry: any;
  orginCountryIndex: any;
  destinationCountry: any;
  destinationIndex: any;

  returnDepartureTime: any;
  returnArrivalTime: any;

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
    this.price = parseInt(this.userService.price);
    this.price = this.adults * this.price + this.children * this.price * 0.5;
    this.currency = this.userService.currency;

    // return time
    this.returnDepartureTime = this.userService.returnDepartureTime;
    this.returnArrivalTime = this.userService.returnArrivalTime;
  }
}
