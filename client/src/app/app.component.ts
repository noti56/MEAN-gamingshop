import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth_service: AuthService, public r: Router) { }
  title = 'Gaming Shop';

  ngOnInit() {
    if (localStorage.gamingShopToken) {
      this.auth_service.user = jwtDecode(localStorage.gamingShopToken)
      this.auth_service.token = localStorage.gamingShopToken
      if (!this.auth_service.hasClickedOnStart) {
        this.r.navigateByUrl('login')
      }
    }

  }
}
