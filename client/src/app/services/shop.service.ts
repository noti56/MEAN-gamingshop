import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(public http: HttpClient, public auth: AuthService) { }

  public categories;

  public getCategories() {

    return this.http.get('http://localhost:1000/main/', {
      headers: { "token": this.auth.token }
    })

  }

  public getCategoryItems(cat) {
    return this.http.get('http://localhost:1000/main/' + cat, {
      headers: { "token": this.auth.token }
    })
  }

  public searchProducts(query) {
    return this.http.get('http://localhost:1000/main/search/' + query, {
      headers: { "token": this.auth.token }
    })
  }

  public selectedProduct: Product;
  public manyCards = true
  public reRerender = false
  public products: Product[]
  public hasSearched = false
}
