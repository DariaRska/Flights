import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css'],
})
export class ConfirmationPageComponent implements OnInit {
  constructor(private userService: UserService) {}

  origin: string = '';
  destination: string = '';
  returnDate: string = '';
  adults: any = '';
  infants: any = '';
  children: any = '';
  selectedPrice: number = 0;
  seats: any;

  ngOnInit(): void {
    this.origin = this.userService.origin;
    this.destination = this.userService.destination;
    this.returnDate = this.userService.returnDate;
    this.adults = this.userService.adults;
    this.infants = this.userService.infants;
    this.children = this.userService.children;
    this.selectedPrice = this.userService.selectedPrice;
    this.seats = this.userService.seats;
  }
}
