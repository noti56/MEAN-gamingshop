import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './comps/login/login.component';
import { MainComponent } from './comps/main/main.component';
import { OrderComponent } from './comps/order/order.component';
import { ProductAddComponent } from './comps/product-add/product-add.component';
import { RegisterComponent } from './comps/register/register.component';
// import { add } from './comps/addProduct/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: MainComponent },
  { path: 'order', component: OrderComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
