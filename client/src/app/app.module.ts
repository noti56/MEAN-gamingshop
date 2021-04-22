import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './comps/login/login.component';
import { RegisterComponent } from './comps/register/register.component';
import { NavbarComponent } from './comps/navbar/navbar.component';
import { WelcomeComponent } from './comps/welcome/welcome.component';

import { HttpClientModule } from '@angular/common/http'

//material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './comps/main/main.component';
import { CartComponent } from './comps/cart/cart.component';
import { ShopComponent } from './comps/shop/shop.component';
import { CardComponent } from './comps/card/card.component';
import { MatListModule } from '@angular/material/list';
import { OrderComponent } from './comps/order/order.component';



import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { SearchComponent } from './comps/search/search.component';

import { ProductAddComponent } from './comps/product-add/product-add.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    WelcomeComponent,
    MainComponent,
    CartComponent,
    ShopComponent,
    CardComponent,
    OrderComponent,
    SearchComponent,
    ProductAddComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatFormFieldModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    NgbModule,
    MatSelectModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
