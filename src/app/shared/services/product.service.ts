import { Product } from '../models/product.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Http, Headers, RequestOptions, Response, RequestMethod } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ProductService extends BaseApiService {
   private static readonly PRODUCTS_API = `${BaseApiService.BASE_API}/products`;
   private productSubject: Subject<any> = new Subject();
   private productsList: Array<any> = [];

  constructor(private http: Http ) {
    super()
    this.notifyProductsListChanges(null);
  }

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

  create(product: Product): Observable<Product> {
    return this.http.post(ProductService.PRODUCTS_API, product.asFormData(), new RequestOptions({ withCredentials: true }))
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  addProductToCart(product) {
    if(product) {
      this.productsList.push(product);
      return this.notifyProductsListChanges(product);
    }
  }

  removeProductFromCart(product) {
    if(product) {
      this.productsList.splice(0 ,1);
      return this.notifyProductsListChanges(null);
    }
  }

  private notifyProductsListChanges(product) {
    this.productSubject.next(this.productsList);
  }

  onProductListChanges(): Observable<any> {
    return this.productSubject.asObservable();
  }



}
