import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(public shop_service: ShopService, public fb: FormBuilder, public cart_service: CartService,
    public auth_service: AuthService,
    public admin_service: AdminService) { }

  public myForm: FormGroup
  ngOnInit(): void {
    this.myForm = this.fb.group({
      quantity: [1, Validators.required]
    })
  }

  @Input() product: Product;
  @Input() img_url: string;
  @Input() alt: string;
  @Input() name: string;
  @Input() price: number;
  @Input() manyCards: boolean;

  public isModalOpen = false

  public openModal(p: Product) {

    this.shop_service.manyCards = false
    this.shop_service.selectedProduct = p
  }

  public closeModal() {
    this.shop_service.manyCards = true
  }

  public cartAdding(product) {
    // let body = { ...product, quantity: this.myForm.value.quantity }
    if (!this.cart_service.hasACart) {

      this.cart_service.newCart().subscribe((res: any) => {

        this.cart_service.cart_id = res.newOpenedCart._id
        this.cart_service.cart_products = res.newOpenedCart.products
        // console.log(this.cart_products)
        this.cart_service.finalPrice = 0

        this.addProductToCart(product)


      }, err => { console.log(err) })
    }
    this.addProductToCart(product)

  }

  public addProductToCart(product) {

    let body = { prod_id: product._id, quantity: this.myForm.value.quantity, cart_id: this.cart_service.cart_id }
    this.cart_service.addToCart(body).subscribe((res) => { console.log(res), err => { console.log(err) } })
    this.cart_service.getOpenedCart()
    this.shop_service.manyCards = true

  }

  //admin

  public setSelectedProductAdmin(p) {

    this.admin_service.selectedProduct = p
    this.admin_service.displayForm = true
    this.admin_service.changeForm()

  }

}
