import { BaseApiService } from '../../../shared/services/base-api.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { SessionService } from '../../../shared/services/session.service';
import { SearchProductsPipe } from '../../../pipe/search-products.pipe';
import { User } from './../../../shared/models/user.model';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = [];
  user: User = this.sessionService.user;

  constructor(
    private productService: ProductService,
    private sessionService: SessionService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.productService.list()
      .subscribe((products) => this.products = products);
      if(this.user != null){
        this.userService.get(this.user.id).subscribe(user => this.user = user);
      }
  }

}
