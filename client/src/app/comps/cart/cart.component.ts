import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cart_service: CartService, public r: Router) { }


  ngOnInit(): void {
    this.cart_service.getOpenedCart()

  }
  @Input() a: string
  @Input() link: string
  @Input() displayFinalPrice: boolean

  // public displayCart = true

  public ifMarks(name: string) {
    //this funciton return true/ false to ngClass . the toMArk from the cart service is the text from the search bar 
    let checks = name.indexOf(this.cart_service.toMark)
    if ((checks != -1 && checks != 0 && this.cart_service.toMark) || (checks == 0 && this.cart_service.toMark != '' || undefined)) return true

    else return false
  }

  public deleteProd(product_id) {
    this.cart_service.deleteFromCart(product_id).subscribe(
      res => {
        // console.log(res)
        this.cart_service.getOpenedCart()
      }, err => { console.log(err) }
    )

  }
  public deleteAllProds() {
    this.cart_service.deleteAllProducts().subscribe(
      res => {
        // console.log(res)
        this.cart_service.getOpenedCart()
      }
      , err => { console.log(err) }

    )




  }
}
