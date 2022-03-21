import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../../core/injectables/WindowRef.injectable';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cart: any = {}

  constructor(private winRef: WindowRef) {
}


  ngOnInit(): void {

    const savedCart = localStorage.getItem('cart');
    // Checks if there was data saved in local storage already
    // This helps add info to local storage, rather than replace
    if (savedCart != null) {
      this.cart = JSON.parse(savedCart);
    }

     // Collapisble Initializer
     var elemsC = document.querySelectorAll('.collapsible');
     var instancesC = this.winRef.nativeWindow.M.Collapsible.init(elemsC);
  }

  totalPrice() {
    let price = 0;
    for(let i=0; i < this.cart.ingredients.length; i++) {
      price+=this.cart.ingredients[i].price;
    }
    return price;
  }
}
