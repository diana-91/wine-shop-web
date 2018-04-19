import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { BaseApiService } from '../../../shared/services/base-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { User } from '../../../shared/models/user.model';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  product: Product = new Product();
  user: User = new User();
  cartProducts: Array<ShoppingCart> = [];
  currentProduct: ShoppingCart = new ShoppingCart();

  constructor(
    private productService: ProductService,
    private router: Router,
    private routes:  ActivatedRoute,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.productService
      .get(this.routes.snapshot.params['id'])
      .subscribe(p => {
        this.product = p;
      });
      if(localStorage.getItem('cart')!= null){
        this.cartProducts = JSON.parse(localStorage.getItem('cart'));
      }

  }

  onSubmitOrder(orderForm) {
    this.currentProduct._productId = this.product.id;
    this.currentProduct.name = this.product.name;
    this.currentProduct.image = this.product.image;
    this.currentProduct.category = this.product.category;
    this.currentProduct.price = this.product.price;
    this.currentProduct.amount = parseInt(orderForm.amount.value);

    this.productService.addProductToCart(this.currentProduct);
    this.cartProducts.push(this.currentProduct);
    this.router.navigate(['/products']);

    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }

}
