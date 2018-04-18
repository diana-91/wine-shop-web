import { Routes } from '@angular/router';
import { SignupComponent } from './components/misc/signup/signup.component';
import { LoginComponent } from './components/misc/login/login.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductItemComponent } from './components/product/product-item/product-item.component';
import { ProfileComponent} from './components/profile/profile.component';
import { OrderItemComponent } from './components/order/order-item/order-item.component';
import { ShoppingCartComponent } from './components/shopping/shopping-cart/shopping-cart.component';

export const routes: Routes = [

  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'products', component: ProductListComponent },
  {
    path: 'products',
    children: [
      { path:':id',
      component: ProductItemComponent }
    ]
  },
  { path: 'orders',
    children:[
      { path: ':id',
      component: OrderItemComponent
      }
    ]
  },
  { path: 'shoppingCart', component: ShoppingCartComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
