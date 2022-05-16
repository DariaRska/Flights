import { Component, OnInit } from '@angular/core';
import { ApiDataService } from 'src/app/services/api-data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})
export class FlightSearchComponent implements OnInit {
  flightsData: Array<any> = [];

  condition: boolean = false;
  showOrigin: boolean = false;
  showDestination: boolean = false;

  origin: Array<string> = [];
  destination: Array<string> = [];

  selectedOriginData: string = '';
  selectedOrginCountryIndex: number = -1;

  selectedDestinationData: string = '';

  // date

  date: any;
  departureDate: string = '';
  returnDate: string = '';

  // persons

  adults: any = 0;
  infants: any = 0;
  children: any = 0;

  count: number = 0;

  ///////////////////////////////////////////////////////
  ////////////////////// send //////////////////////////
  /////////////////////////////////////////////////////

  originCountry: any;
  orginCountryIndex: any;
  destinationCountry: any;
  destinationIndex: any;

  departureTime: any;
  arrivalTime: any;
  price: any;
  currency: any;

  returnDepartureCountry: any;
  returnArrivalCountry: any;

  returnDepartureCountryIndex: any;
  returnArrivalCountryIndex: any;

  returnDepartureTime: any;
  returnArrivalTime: any;

  constructor(
    private apiData: ApiDataService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // date
    this.date = new Date().toISOString().slice(0, 10);

    // apiService

    this.apiData.getApiData().subscribe((data: any) => {
      this.flightsData.push(data);
    });
  }

  // apiService

  downoladOrigin() {
    this.apiData.getApiData();

    this.origin = this.flightsData[0].airports.map(function (el: any) {
      return `${el.originCountry} - ${el.originCity}`;
    });

    this.condition = true;
    this.showOrigin = true;
  }

  // show destination when the orgin is selected

  downoladDestination() {
    this.apiData.getApiData();

    // based on selectedOrginCountryIndex

    this.destination = this.flightsData[0].airports[
      this.selectedOrginCountryIndex
    ].destinations.map(function (el: any) {
      return `${el.destinationCountry} - ${el.destinationCity}`;
    });

    this.condition = true;
    this.showDestination = true;
  }

  hideData() {
    this.condition = false;
    this.showOrigin = false;
    this.showDestination = false;
  }

  // userService

  selectedOrigin(param: string) {
    this.selectedOriginData = param;
    this.userService.origin = this.selectedOriginData;

    this.condition = false;
    this.showOrigin = false;
    this.selectedDestinationData = '';

    let selectedOriginCountry: any = this.selectedOriginData
      .split('-')[0]
      .slice(0, this.selectedOriginData.split('-')[0].length - 1);

    this.selectedOrginCountryIndex = this.flightsData[0].airports.findIndex(
      (x: any) => x.originCountry === selectedOriginCountry
    );
  }

  selectedDestination(param: string) {
    this.selectedDestinationData = param;
    this.userService.destination = this.selectedDestinationData;

    this.condition = false;
    this.showDestination = false;
  }

  // date

  selectedDepartureDate(param: string) {
    this.departureDate = param;
    this.userService.departureDate = this.departureDate;
    // showgood result without returnDate
    this.returnDate = '';
    this.userService.returnDate = '';
  }

  selectedReturnDate(param: string) {
    this.returnDate = param;
    this.userService.returnDate = this.returnDate;
  }

  // people

  countPeople() {
    let sum = this.adults + this.infants + this.children;
    if (this.count - sum === -1) {
      this.count++;
    } else if (this.count - sum > 0) {
      this.count = this.count - (this.count - sum);
    } else {
      this.count = sum;
    }
  }

  adultsQuantity(param: string) {
    this.adults = param;
    parseInt(this.adults);
    this.userService.adults = this.adults;

    this.countPeople();
  }

  infantsQuantity(param: string) {
    this.infants = param;
    parseInt(this.infants);
    this.userService.infants = this.infants;

    this.countPeople();
  }

  childrenQuantity(param: string) {
    this.children = param;
    parseInt(this.children);
    this.userService.children = this.children;

    this.countPeople();
  }

  ///////////////////////////////////////////////////////
  ////////////////////// send //////////////////////////
  /////////////////////////////////////////////////////

  // send data to service:

  send() {
    // origin and destination country + index

    this.originCountry = this.selectedOriginData
      .split('-')[0]
      .slice(0, this.selectedOriginData.split('-')[0].length - 1);

    this.orginCountryIndex = this.flightsData[0].airports.findIndex(
      (x: any) => x.originCountry === this.originCountry
    );

    this.destinationCountry = this.selectedDestinationData
      .split('-')[0]
      .slice(0, this.selectedDestinationData.split('-')[0].length - 1);

    this.destinationIndex = this.flightsData[0].airports[
      this.orginCountryIndex
    ].destinations.findIndex(
      (x: any) => x.destinationCountry === this.destinationCountry
    );

    // origin and destination data

    this.departureTime =
      this.flightsData[0].airports[this.orginCountryIndex].destinations[
        this.destinationIndex
      ].departureTime;

    this.userService.departureTime = this.departureTime;

    this.arrivalTime =
      this.flightsData[0].airports[this.orginCountryIndex].destinations[
        this.destinationIndex
      ].arrival;

    this.userService.arrivalTime = this.arrivalTime;

    this.price =
      this.flightsData[0].airports[this.orginCountryIndex].destinations[
        this.destinationIndex
      ].price;

    this.userService.price = this.price;

    this.currency =
      this.flightsData[0].airports[this.orginCountryIndex].destinations[
        this.destinationIndex
      ].currency;

    this.userService.currency = this.currency;

    // people

    this.userService.adults = this.adults;
    this.userService.infants = this.infants;
    this.userService.children = this.children;

    // two way trip

    this.returnDepartureCountry = this.selectedDestinationData
      .split('-')[0]
      .slice(0, this.selectedDestinationData.split('-')[0].length - 1);

    this.returnDepartureCountryIndex = this.flightsData[0].airports.findIndex(
      (x: any) => x.originCountry === this.returnDepartureCountry
    );

    this.returnArrivalCountry = this.selectedOriginData
      .split('-')[0]
      .slice(0, this.selectedOriginData.split('-')[0].length - 1);

    this.returnArrivalCountryIndex = this.flightsData[0].airports[
      this.returnDepartureCountryIndex
    ].destinations.findIndex(
      (x: any) => x.destinationCountry === this.returnArrivalCountry
    );

    this.returnDepartureTime =
      this.flightsData[0].airports[
        this.returnDepartureCountryIndex
      ].destinations[this.returnArrivalCountryIndex].departureTime;

    this.userService.returnDepartureTime = this.returnDepartureTime;

    this.returnArrivalTime =
      this.flightsData[0].airports[
        this.returnDepartureCountryIndex
      ].destinations[this.returnArrivalCountryIndex].arrival;

    this.userService.returnArrivalTime = this.returnArrivalTime;
  }
}
