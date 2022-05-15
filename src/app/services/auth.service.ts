import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from '../interfaces/auth-data.model';
import { User } from '../interfaces/user-int/user.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User | any;
  private password: string = '';
  private userAuthIndex: number = 0;

  constructor(private router: Router, private userService: UserService) {}

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: this.userService.users.findIndex(
        (x: any) => x.email === authData.email
      ),
    };

    this.password = authData.password;
    this.userAuthIndex = this.userService.userAuth.findIndex(
      (x: any) => x.email === this.user.email
    );
    this.checkUser();
  }

  checkUser() {
    if (
      this.user.userId !== -1 &&
      this.password === this.userService.userAuth[this.userAuthIndex].password
    ) {
      this.authChange.next(true);
      this.navigate();
    } else {
      alert('Wrong e-mail or password, try again');
      this.router.navigate(['/login']);
      this.authChange.next(false);
    }
  }

  navigate() {
    // navigate dependencies

    if (
      this.userService.origin &&
      this.userService.destination &&
      this.userService.departureDate &&
      this.userService.adults
    ) {
      this.router.navigate(['/results']);
    } else {
      this.router.navigate(['/search']);
    }
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/search']);

    // reset data from previous session at user.service
    this.userService.origin = '';
    this.userService.destination = '';
    this.userService.departureDate = '';
    this.userService.returnDate = '';
    this.userService.adults = '';
    this.userService.infants = '';
    this.userService.children = '';
    this.userService.departureTime = '';
    this.userService.arrivalTime = '';
    this.userService.price = '';
    this.userService.currency = '';
    this.userService.returnDepartureTime = '';
    this.userService.returnArrivalTime = '';
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }
}
