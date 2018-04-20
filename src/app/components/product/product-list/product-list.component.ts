import { BaseApiService } from '../../../shared/services/base-api.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../shared/services/product.service';
import { SessionService } from '../../../shared/services/session.service';
import { SearchProductsPipe } from '../../../pipe/search-products.pipe';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<Product> = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.list()
      .subscribe((products) => this.products = products);
  }

}
