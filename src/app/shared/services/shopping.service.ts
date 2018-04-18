import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ShoppingCart } from '../models/shopping-cart.model';

@Injectable()
export class ShoppingService {


  constructor() { }

  delete(index: number): Array<ShoppingCart> {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index,1);
    return cart;
 }

}
