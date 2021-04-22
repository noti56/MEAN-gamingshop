import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth_service: AuthService, public r: Router, public admin_service: AdminService) { }

  ngOnInit(): void {

  }

  public logout() {
    this.auth_service.token = undefined
    this.auth_service.user = undefined
    this.auth_service.hasClickedOnStart = false
    // localStorage.gamingShopToken = undefined
    localStorage.removeItem('gamingShopToken')

    this.r.navigateByUrl('login')
  }

  // public route() {
  //   this.admin_service.selectedProduct = undefined
  //   this.r.navigateByUrl('addProduct')
  // }
  public handleBackHome() {
    this.auth_service.hasClickedOnStart = false
    this.r.navigateByUrl('login')

  }

}
