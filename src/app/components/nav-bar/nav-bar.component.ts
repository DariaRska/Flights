import { Component, OnInit } from '@angular/core';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  faPlane = faPlane;

  constructor() {}

  ngOnInit(): void {}
}
