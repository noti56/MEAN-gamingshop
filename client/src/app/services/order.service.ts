import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http: HttpClient, public auth_service: AuthService, public cart_service: CartService) { }

  public order_reciept;
  public postOrder(body) {
    return this.http.post('http://localhost:1000/order/', body, {
      headers: { "token": this.auth_service.token }
    })
  }
  public dateChekcer(date) {
    return this.http.get('http://localhost:1000/order/' + date, {
      headers: { "token": this.auth_service.token }
    })
  }

  public getReciept(cart_id) {
    return this.http.get('http://localhost:1000/order/' + cart_id, {
      headers: { "token": this.auth_service.token }
    })
  }



}
