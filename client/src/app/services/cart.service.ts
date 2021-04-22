import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(public http: HttpClient, public auth_service: AuthService) { }

  public cart_id: string;
  public cart_products;
  public finalPrice: number
  public hasACart = false
  public displayCart = true


  public getOpenedCart() {

    return this.http.get('http://localhost:1000/cart/opened-cart', {
      headers: { "token": this.auth_service.token }
    }).subscribe(
      (res: any) => {
        if (res.openedCart) {
          this.cart_id = res.openedCart._id
          this.cart_products = res.openedCart.products

          this.finalPrice = res.finalPrice

          this.hasACart = true
        }
        else {
          this.hasACart = false

        }
      },

      err => {
        console.log(this.auth_service.token)
        console.log(err)
      })
  }


  public newCart() {
    return this.http.get('http://localhost:1000/cart/new-cart', {
      headers: { "token": this.auth_service.token }
    })
  }



  // public cart_products;
  public addToCart(body) {
    console.log(body)
    return this.http.post('http://localhost:1000/cart/new-item', body, {
      headers: { "token": this.auth_service.token }
    })
  }

  public deleteFromCart(product_id) {

    return this.http.delete('http://localhost:1000/cart/' + this.cart_id + '/' + product_id, {
      headers: { "token": this.auth_service.token }
    })
  }

  public deleteAllProducts() {

    return this.http.delete('http://localhost:1000/cart/' + this.cart_id, {
      headers: { "token": this.auth_service.token }
    })
  }


  public toMark: string;
  // public markHandle(){

  // }




}
