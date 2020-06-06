import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(newCartItem: CartItem) {
    let isItemAlreadyInCart = false;
    let existingCartItem = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(cartItem => cartItem.id == newCartItem.id);
      isItemAlreadyInCart = (existingCartItem != undefined);
    }

    if (isItemAlreadyInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(newCartItem);
    }

    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    let totalQuantity = 0;

    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.quantity * cartItem.unitPrice;
      totalQuantity += cartItem.quantity;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);
  }
}
