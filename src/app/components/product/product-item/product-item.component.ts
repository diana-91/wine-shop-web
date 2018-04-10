import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { BaseApiService } from '../../../shared/services/base-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../../shared/services/session.service';
import { User } from '../../../shared/models/user.model'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  product: Product = new Product();
  user: User = new User();

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
      })
  }

  onSubmitOrder(orderForm) {
    this.sessionService.authenticate(this.user).subscribe(
      (user => {
        orderForm.reset();
        this.router.navigate(['/product'])
      })
    )
  }

}
