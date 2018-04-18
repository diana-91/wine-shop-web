import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from './../../../shared/models/order.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  order: Order;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private routes:  ActivatedRoute
  ) { }

  ngOnInit() {
    this.orderService
      .get(this.routes.snapshot.params['id'])
      .subscribe(order => {
        this.order = order;
        for(let i=0; i< this.order._productId.length; i++){
          this.order._productId[i].amount = this.order.amount[i];
        }
      })

  }


}
