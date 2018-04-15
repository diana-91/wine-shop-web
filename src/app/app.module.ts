import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/misc/login/login.component';
import { SignupComponent } from './components/misc/signup/signup.component';
import { NavbarComponent } from './components/misc/navbar/navbar.component';
import { SessionService } from './shared/services/session.service';
import { UserService } from './shared/services/user.service';
import { ProductService } from './shared/services/product.service';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import { SearchProductsPipe } from './pipe/search-products.pipe';
import { ShoppingCartComponent } from './components/shopping/shopping-cart/shopping-cart.component';
import { ShoppingService } from './shared/services/shopping.service';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderComponent } from './components/order/order.component';
import { OrderService } from './shared/services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ProductListComponent,
    ProductItemComponent,
    SearchProductsPipe,
    ShoppingCartComponent,
    ProfileComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule
  ],
  providers: [
    SessionService,
    UserService,
    ProductService,
    ShoppingService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
