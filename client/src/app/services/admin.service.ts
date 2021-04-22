import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Product } from '../interfaces/product.interface';
import { ShopService } from './shop.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http: HttpClient, public auth_service: AuthService, public fb: FormBuilder, public r: Router, public shop_service: ShopService) { }
  public addProd(body) {
    return this.http.post('http://localhost:1000/admin', body, {
      headers: { "token": this.auth_service.token }

    })
  }

  public editProd(body) {
    return this.http.put('http://localhost:1000/admin', body, {
      headers: { "token": this.auth_service.token }

    })
  }

  //===========================>
  public selectedProduct: Product
  public displayForm = false
  //<===========================


  public productManageForm: FormGroup
  public categories

  public changeForm() {
    if (!this.selectedProduct) {
      //=======================
      //get Categories for the input
      this.shop_service.getCategories().subscribe(
        (res: any) => {
          this.categories = res.categories
          console.log(this.categories)
        },
        err => { console.log(err) })
      //===========================
      this.productManageForm = this.fb.group({
        name: ["", Validators.required],
        price: [0, Validators.required],
        img_url: ["", Validators.required],
        category: ["", Validators.required]
      })
    }
    else {
      // EDIT FORM
      const { name, img_url, price } = this.selectedProduct
      this.productManageForm = this.fb.group({
        name: [name, Validators.required],
        img_url: [img_url, Validators.required],
        price: [price, Validators.required],
      })
    }
  }





}
