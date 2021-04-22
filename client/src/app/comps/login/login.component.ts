import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public fb: FormBuilder,
    public auth_service: AuthService,
    public r: Router,
    public cart_service: CartService
  ) { }


  public myForm: FormGroup

  ngOnInit(): void {
    if (this.auth_service.user && this.auth_service.hasClickedOnStart) {
      this.r.navigateByUrl('')
    };


    this.myForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });

  }
  public errorDisplay: string;


  public loginSubmit() {
    this.auth_service.login(this.myForm.value).subscribe(
      (res: any) => {
        localStorage.gamingShopToken = res.token
        this.auth_service.token = res.token
        this.auth_service.user = res.userDB
        this.cart_service.getOpenedCart()
        this.hasLoggedNowMsg()


      },
      err => {
        console.error(err)
        this.errorDisplay = err.error.msg
      })
  }

  public errBtn_click = false
  public routeToShop() {
    if (this.auth_service.user) {
      this.auth_service.hasClickedOnStart = true
      this.r.navigateByUrl('')
    } else {
      this.errBtn_click = true
      setTimeout(() => {
        this.errBtn_click = false

      }, 3000);
    }
  }

  // display Logged Now msg
  public loggedNow = false
  public hasLoggedNowMsg() {
    this.loggedNow = true
    setTimeout(() => {
      this.loggedNow = false

    }, 3000);
  }






}
