import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product.interface';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public shop_service: ShopService,
    public cart_service: CartService,
    public auth_service: AuthService,
    public r: Router,
    public admin_service: AdminService) { }

  ngOnInit(): void {
    if (!this.auth_service.user) { this.r.navigateByUrl('login') }


  }






}
