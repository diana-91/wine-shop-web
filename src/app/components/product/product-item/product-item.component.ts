import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { BaseApiService } from '../../../shared/services/base-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { User } from '../../../shared/models/user.model';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';


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
    private sessionService: SessionService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

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
    this.showSuccess();
    this.currentProduct._productId = this.product.id;
    this.currentProduct.name = this.product.name;
    this.currentProduct.image = this.product.image;
    this.currentProduct.category = this.product.category;
    this.currentProduct.price = this.product.price;
    this.currentProduct.amount = parseInt(orderForm.amount.value);

    this.productService.addProductToCart(this.currentProduct);
    this.cartProducts.push(this.currentProduct);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 1000);

  }

  showSuccess() {
    this.toastr.success('Se ha añadido el producto a su carrito');
  }



}
