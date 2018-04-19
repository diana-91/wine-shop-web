import { Injectable } from '@angular/core';
import { Order } from './../models/order.model';
import { BaseApiService } from './base-api.service';
import { environment } from './../../../environments/environment';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class OrderService extends BaseApiService {
  private static readonly ORDER_API = `${BaseApiService.BASE_API}/orders`;


  constructor(private http: Http) { super() }

  list(): Observable<Array<Order>> {
    return this.http.get(OrderService.ORDER_API, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error))
  }

  listUserOrders(id: string): Observable<Array<Order>> {
    return this.http.get(`${OrderService.ORDER_API}/search/${id}`, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error))
  }

  get(id: string): Observable<Order> {
    return this.http.get(`${OrderService.ORDER_API}/${id}`, BaseApiService.defaultOptions)
    .map((res: Response) => res.json())
    .catch(error => this.handleError(error))
  }

  create(order: Order): Observable<Order> {
    return this.http.post(OrderService.ORDER_API, JSON.parse(JSON.stringify(order)), new RequestOptions({ withCredentials: true }))
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }




}
