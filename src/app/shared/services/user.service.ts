import { Observable } from 'rxjs/Rx';
import { User } from './../models/user.model';
import { Http, Response } from '@angular/http';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';


@Injectable()
export class UserService extends BaseApiService {
  private static readonly USERS_API = `${BaseApiService.BASE_API}/users`;

  constructor(
    private http: Http
  ) {
    super();
  }

  create(user: User): Observable<User> {
    return this.http.post(UserService.USERS_API, JSON.stringify(user), BaseApiService.defaultOptions)
      .map(res => res.json())
      .catch(error => this.handleError(error));
  }

  edit(user: User): Observable<User> {
    return this.http.put(`${UserService.USERS_API}/${user.id}`, JSON.stringify(user), BaseApiService.defaultOptions)
      .map((res: Response) => res.json())
      .catch(error => this.handleError(error));
  }

  get(id: string): Observable<User> {
    return this.http.get(`${UserService.USERS_API}/${id}`, BaseApiService.defaultOptions)
      .map( (res: Response) => res.json())
      .catch( error => this.handleError(error) );
  }

  equals(user1: User, user2: User): boolean {
    let flag = false;
    if(user1.address == user2.address && user1.email == user2.email &&
    user1.id == user2.id && user1.lastname == user2.lastname &&
    user1.location == user2.location && user1.name == user2.name &&
    user1.telephone == user2.telephone && user1.role == user2.role) flag = true;
    return flag;
  }

}
