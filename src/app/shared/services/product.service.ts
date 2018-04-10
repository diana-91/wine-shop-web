import { Product } from '../models/product.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductService extends BaseApiService {
   private static readonly PRODUCTS_API = `${BaseApiService.BASE_API}/products`;

  constructor(private http: Http ) { super() }

  list(): Observable<Array<Product>> {
    return this.http.get(ProductService.PRODUCTS_API, BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error))
  }

  get(id: string): Observable<Product> {
    return this.http.get(`${ProductService.PRODUCTS_API}/${id}`, BaseApiService.defaultOptions)
    .map((res: Response) => res.json())
    .catch(error => this.handleError(error))
  }

}
