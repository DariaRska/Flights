import { Injectable } from '@angular/core';
import { AuthData } from '../interfaces/auth-data.model';
import { User } from '../interfaces/user-int/user.model';

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

  departureTime: any;
  arrivalTime: any;
  price: any;
  currency: any;

  returnDepartureTime: any;
  returnArrivalTime: any;

  selectedPrice: number = 0;
  seats: string[] = [];

  // these credentials are for learning purposes only:

  user1: User = {
    email: 'test@test.com',
    userId: '1',
  };

  user2: User = {
    email: 'admin@admin.com',
    userId: '2',
  };

  user3: User = {
    email: 'user@example.com',
    userId: '3',
  };

  users: Array<User> = [this.user1, this.user2, this.user3];

  userAuth1: AuthData = {
    email: this.user1.email,
    password: 'testtest',
  };
  userAuth2: AuthData = {
    email: this.user2.email,
    password: 'adminadmin',
  };
  userAuth3: AuthData = {
    email: this.user3.email,
    password: 'exampleexample',
  };

  userAuth: Array<AuthData> = [this.userAuth1, this.userAuth2, this.userAuth3];
}
