import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';
import { Order } from '../../../shared/models/order.model';
import { OrderService } from '../../../shared/services/order.service';
import { SessionService } from '../../../shared/services/session.service';
import { Router } from '@angular/router';
import { ShoppingService } from '../../../shared/services/shopping.service';
import { ProductService } from '../../../shared/services/product.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  order: Order = new Order();
  currentProduct: Array<ShoppingCart> = [];
  columnsToDisplay = ['image','name','category','amount','price','totalPrice','actions'];
  totalPrice: number=0;
  apiError: string;

  constructor(
    private orderService: OrderService,
    private sessionService: SessionService,
    private router: Router,
    private shoppingService: ShoppingService,
    private productService : ProductService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    if(localStorage.getItem('cart')!=null){
      this.currentProduct = JSON.parse(localStorage.getItem('cart'));
      this.changeTotal();
    }

  }

  changeTotal(){
    if(this.currentProduct.length > 0){
      let price=0;
      for(let i= 0; i<this.currentProduct.length; i++){
        price += this.currentProduct[i].price *this.currentProduct[i].amount;
      }
      localStorage.setItem("cart", JSON.stringify(this.currentProduct));
      this.totalPrice =  price;
    }else{
      this.totalPrice =0;
    }
  }

  sendOrder() {
    this.order._userId = this.sessionService.user.id;
    this.order.state = 'Preparando';
    this.order.totalPrice = this.totalPrice;
    for(let i= 0; i<this.currentProduct.length; i++){
      this.order._productId[i] = this.currentProduct[i]._productId;
      this.order.amount[i] = this.currentProduct[i].amount;
    }
    this.orderService.create(this.order).subscribe(
      (order) => {
        localStorage.clear();
        this.showSuccess();
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 3000);


      },
      (error) => {
        this.apiError = error.message;
      }
    )
  }

  cartDeleteProduct( index: number){
    this.currentProduct = this.shoppingService.delete(index);
    this.productService.removeProductFromCart(this.currentProduct);
    this.changeTotal();
  }

  showSuccess() {
    this.toastr.success('En unos días recibirás su pedido!', '¡Muchas gracias por su compra!');
  }

  showError(){
    this.toastr.error('Inténtelo de nuevo.','Error en la compra.')
  }

}
