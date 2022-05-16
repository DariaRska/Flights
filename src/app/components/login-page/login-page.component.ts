import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.authService.login({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
