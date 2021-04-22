import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stats } from 'src/app/interfaces/stats.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(public http: HttpClient, public auth_service: AuthService, public cart_service: CartService) { }

  public stats: any = ''
  ngOnInit(): void {
    this.http.get('http://localhost:1000/welcome').subscribe((res: any) => { this.stats = res }, err => { console.log(err) });

    if (this.auth_service.user) {
      this.getLoggedInfo()
      this.cart_service.getOpenedCart()
    }


  }
  public dateOpened_cart;
  public dateOrdering_order;
  public getLoggedInfo() {
    this.http.get('http://localhost:1000/welcome/logged', { headers: { "token": this.auth_service.token } })
      .subscribe((res: any) => {

        if (res.cartForUser) {
          this.dateOpened_cart = res.cartForUser.dateOpened
          this.cart_service.hasACart = true
        }
        if (res.latestPurcahse) {
          this.dateOrdering_order = res.latestPurcahse.date_ordering
        }

      }, err => { console.log(err) });
  }


}
