import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public r: Router, public cart_service: CartService, public shop_service: ShopService) { }

  ngOnInit(): void {
  }


  public order(e) {
    if (this.r.url == '/order') {

      this.cart_service.toMark = e.target.value
    }
    if (this.r.url == '/') {
      this.shop_service.hasSearched = true

      this.shop_service.searchProducts(e.target.value).subscribe((res: any) => {
        console.log(res)
        this.shop_service.products = res.products
        console.log(this.shop_service.products)
      }, err => { console.log(err) })

      console.log('blah')
      // this.shop_service.

    }

  }



  public handleSubmit(e) {

    console.log(e.target)
  }
}
