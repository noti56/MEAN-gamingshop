import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  constructor(public auth_servic: AuthService, public fb: FormBuilder, public admin_service: AdminService,
    public shop_service: ShopService, public r: Router) { }


  public productManageForm: FormGroup

  ngOnInit(): void {
    this.admin_service.changeForm()
  }



  public newProductFormDisplayer() {
    this.admin_service.selectedProduct = undefined
    this.admin_service.displayForm = true
    this.admin_service.changeForm()

  }






  public msg: string
  public handleSubmit() {
    //new Product
    if (!this.admin_service.selectedProduct) {
      this.admin_service.addProd(this.admin_service.productManageForm.value).subscribe(
        (res: any) => {
          this.admin_service.selectedProduct = undefined
          let p = this.shop_service.categories.filter(p => p._id == res.newProduct[0].category)
          this.shop_service.getCategoryItems(p[0].name).subscribe(
            (res: any) => {
              this.shop_service.hasSearched = false
              this.shop_service.products = res.products

            },
            err => {
              console.log(err)
            })

        },
        err => console.log(err))

    } else {
      //Edit Product
      let obj = {
        ...this.admin_service.productManageForm.value, _id: this.admin_service.selectedProduct._id,
        category: this.admin_service.selectedProduct.category
      }
      this.admin_service.editProd(obj).subscribe(
        (res: any) => {
          console.log(res.updatedProduct)

          let p = this.shop_service.categories.filter(p => p._id == res.updatedProduct.category)

          // cat = cat.tab.textLabel
          this.shop_service.getCategoryItems(p[0].name).subscribe(
            (res: any) => {

              this.shop_service.hasSearched = false
              this.shop_service.products = res.products

            },
            err => {
              console.log(err)
            })

          this.msg = res.msg
          setTimeout(() => {
            this.msg = ''
          }, 2500)

        },
        err => console.log(err))
    }
  }

  public handleLowerBtnTxt() {
    if (!this.admin_service.selectedProduct) {
      return 'Add'
    } else {
      return 'Edit'
    }

  }
}