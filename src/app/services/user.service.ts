import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  origin: string = '';
  destination: string = '';

  departureDate: string = '';
  returnDate: string = '';

  adults: any;
  infants: any;
  children: any;
}
