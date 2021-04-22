import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(public shop_service: ShopService,
    public fb: FormBuilder,
    public auth_service: AuthService,
    public r: Router) { }

  public myForm: FormGroup

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ["", Validators.required]
    })
    this.shop_service.getCategories().subscribe(
      (res: any) => {
        this.shop_service.categories = res.categories

      },
      err => { console.log(err) })

  }

  navCatHandle(cat) {
    // cat = cat.target.textContent
    cat = cat.tab.textLabel
    this.shop_service.getCategoryItems(cat).subscribe(
      (res: any) => {
        console.log(res.products)
        this.shop_service.hasSearched = false
        this.shop_service.products = res.products

      },
      err => {
        console.log(err)
      })
  }

}
