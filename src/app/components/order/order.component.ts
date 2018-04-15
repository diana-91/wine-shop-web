import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from './../../shared/services/order.service';
import { Order } from './../../shared/models/order.model';
import { MatTableModule } from '@angular/material/table';
import {Sort} from '@angular/material';
import { SessionService } from './../../shared/services/session.service';
import { User } from './../../shared/models/user.model';



@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[]=[];
  columnsToDisplay = ['orderId','date','state','totalPrice','actions'];
  private sortedData;
  user: User = this.sessionService.user;


  constructor(
      private orderService: OrderService,
      private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.orderService.listUserOrders(this.user.id)
      .subscribe((orders) => this.orders = orders);
    this.sortedData = this.orders.slice();
  }

  sortData(sort: Sort) {
    const data = this.orders.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'state': return compare(a.state, b.state, isAsc);
        case 'totalPrice': return compare(+a.totalPrice, +b.totalPrice, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
