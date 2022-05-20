import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-choose-seats',
  templateUrl: './choose-seats.component.html',
  styleUrls: ['./choose-seats.component.css'],
})
export class ChooseSeatsComponent implements OnInit {
  origin: string = '';
  destination: string = '';

  adults: any;
  infants: any;
  children: any;

  seats: string[] = [];
  selectedSeats: boolean = false;
  people: number = 0;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.origin = this.userService.origin;
    this.destination = this.userService.destination;
    this.adults = this.userService.adults;
    this.infants = this.userService.infants;
    this.children = this.userService.children;
    this.people =
      this.userService.adults +
      this.userService.infants +
      this.userService.children;
  }

  selected(event: any) {
    if (this.people > 0) {
      if (
        event.target.attributes.class.value === 'fil4' ||
        event.target.attributes.class.value === 'clicked'
      ) {
        if (event.target.attributes.class.value === 'fil4') {
          event.target.attributes.class.value = 'clicked';
          // add seat to array
          this.seats.push(event.target.attributes.id.value);
          this.people--;
          if (this.people === 0) {
            this.selectedSeats = true;
          }
        } else {
          event.target.attributes.class.value = 'fil4';
          // delete seat from array
          this.seats.map(function (el, i, arr) {
            if (event.target.attributes.id.value === el) {
              arr.splice(i, 1);
            }
          });
        }
      }
    } else {
      alert('Thank you for selecting seats, please submit your choice');
    }
  }

  onSubmit() {
    this.userService.seats = this.seats;
  }
}
