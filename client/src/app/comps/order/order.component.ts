import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public fb: FormBuilder, public order_service: OrderService, public cart_service: CartService,
    public auth_service: AuthService) { }

  public regex = `^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$`
  public myForm: FormGroup
  ngOnInit(): void {
    this.myForm = this.fb.group({
      city: ['', Validators.required],
      street: [this.streetDB, Validators.required],
      shippingDate: ["", Validators.required],
      creditCard: ["", [Validators.required, Validators.pattern(this.regex)]]
    })
    this.cart_service.displayCart = true
  }
  // , Validators.pattern('^4[0-9]{12}(?:[0-9]{3})?$')
  // 
  public cityDB: string
  public streetDB: string

  public fillInput(input) {

    switch (input) {
      case 'city':
        this.myForm.controls.city.setValue(this.auth_service.user.city)
        break;
      case 'street':

        this.myForm.controls.street.setValue(this.auth_service.user.street)

        break;
    }
  }
  public products: Product[]
  public finalPrice: number

  public displayModalBool = false;
  // private cart_id: string;

  public handleSubmit() {
    let obj = { ...this.myForm.value, cart_id: this.cart_service.cart_id, finalPrice: this.cart_service.finalPrice }
    // console.log(obj)
    this.order_service.postOrder(obj).subscribe((res: any) => {
      // console.log(res.order_DB)

      this.cart_service.cart_id = undefined
      this.products = this.cart_service.cart_products
      this.cart_service.cart_products = undefined
      this.finalPrice = this.cart_service.finalPrice
      this.cart_service.finalPrice = undefined
      this.cart_service.getOpenedCart()
      this.displayModalBool = true
      this.order_service.order_reciept = res.order_DB
    },
      err => { console.log(err) })
  }


  public displayMsg = false
  public errorDate: string
  // DATE 3 TIMES SHIPMENT HANDLER 
  public handleDate() {
    this.order_service.dateChekcer(this.myForm.controls.shippingDate.value).subscribe(
      (res: any) => {

        if (!res.dateOpened) {
          this.displayMsg = true
          this.errorDate = this.myForm.controls.shippingDate.value
          this.myForm.controls.shippingDate.setValue('')

        }
        else {
          this.displayMsg = false
        }
      },
      err => { console.log(err) }
    )
  }

  //==========================================
  // RECIEPT HANDLERS
  public styleForReciept = `
<style>
html,body{
  height: 100%;
  width: 100%;
  margin: 0;
}

.flex{
  width: 100%;
  height: 100%;
  display: flex;
  background-color: gray;
  
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  color: rgb(182, 41, 91);
}
  </style>
`

  public printIt(printThis) {
    var win = window.open();
    self.focus();
    win.document.open();
    win.document.write('<' + 'html' + '>' + this.styleForReciept + '<' + 'body' + '>');
    win.document.write(`<div class="flex">${printThis}</div>`);
    win.document.write('<' + '/body' + '><' + '/html' + '>');
    win.document.close();
    win.print();
    win.close();
  }

  public htmlMaker(products, finalPrice, name) {
    let str = '';
    products.forEach(p => {
      str += `<li>  <span> ${p.prod_id.name}</span> price:  ${p.prod_id.price}  quantity: ${p.quantity}   </li>`
    });

    return `<h1> Thank you for buying in Gaming Shop!</h1>
    <h2> reciept for ${name}</h2>
        <ul>
         
         ${str}
    </ul>
            <h3>final price :  ${finalPrice} </h3>
            <h4>Please come again ! </h4>

    `


  }
  sendReciept() {
    this.printIt(this.htmlMaker(this.products, this.finalPrice, this.auth_service.user.name))
  }
  //RECIEPT HANDLER <==
  //==========================================


}
