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

  choosenOriginData: string = '';
  choosenOrginCountryIndex: number = -1;

  choosenDestinationData: string = '';

  // date

  date: any;
  departureDate: string = '';
  returnDate: string = '';

  // persons

  adults: any = 0;
  infants: any = 0;
  children: any = 0;

  count: number = 0;

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

  // show destination when the orgin is choosen

  downoladDestination() {
    this.apiData.getApiData();

    // based on choosenOrginCountryIndex

    this.destination = this.flightsData[0].airports[
      this.choosenOrginCountryIndex
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

  choosenOrigin(param: string) {
    this.choosenOriginData = param;
    this.userService.origin = this.choosenOriginData;

    this.condition = false;
    this.showOrigin = false;
    this.choosenDestinationData = '';

    let choosenOriginCountry: any = this.choosenOriginData
      .split('-')[0]
      .slice(0, this.choosenOriginData.split('-')[0].length - 1);

    this.choosenOrginCountryIndex = this.flightsData[0].airports.findIndex(
      (x: any) => x.originCountry === choosenOriginCountry
    );
  }

  choosenDestination(param: string) {
    this.choosenDestinationData = param;
    this.userService.destination = this.choosenDestinationData;

    this.condition = false;
    this.showDestination = false;
  }

  // date

  choosenDepartureDate(param: string) {
    this.departureDate = param;
    this.userService.departureDate = this.departureDate;
  }

  choosenReturnDate(param: string) {
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
}
