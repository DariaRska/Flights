import { Component, OnInit, OnDestroy } from '@angular/core';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  faPlane = faPlane;
  isAuth: boolean = false;
  authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
