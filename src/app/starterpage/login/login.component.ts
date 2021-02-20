import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide = true;
  public errorText: string;
  constructor( private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login(login): void {
    // tslint:disable-next-line:max-line-length
    this.auth.login(login.login.email, login.login.password).then(() => this.router.navigate(['/starter-page'])).catch(err => this.loginError());
  }
  loginError(): void {
    this.errorText = 'Coś nie wyszło, sprobuj jeszcze raz';
  }
}
