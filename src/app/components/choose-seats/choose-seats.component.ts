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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.origin = this.userService.origin;
    this.destination = this.userService.destination;
    this.adults = this.userService.adults;
    this.infants = this.userService.infants;
    this.children = this.userService.children;
  }
  // status: boolean = false;
  // addColor() {
  //   this.status = !this.status;
  //   console.log('clicked');
  // }
}
