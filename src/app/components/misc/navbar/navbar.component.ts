import { Observable, Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { User } from './../../../shared/models/user.model';
import { SessionService } from './../../../shared/services/session.service';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private user: User;
  private userSubscription: Subscription;
  productsSubcription: Subscription;
  private productsList : Array <any>;
  private numberProducts : number = this.productsList && this.productsList.length || 0;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.user = this.sessionService.getUser();
    this.userSubscription = this.sessionService.onUserChanges()
     .subscribe(user => this.user = user);
    this.productsSubcription = this.productService.onProductListChanges()
      .subscribe(list => {
        this.productsList = list;
        this.numberProducts = this.productsList.length;
      });
  }

  ngOnDestroy() {
    this.productsSubcription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  onClickLogout() {
    this.sessionService.logout()
      .subscribe(() => {
        localStorage.clear();
        this.router.navigate(['/products']);
      });
  }


}
