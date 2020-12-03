import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "products", component: ProductsComponent },
  { path: "product-detail/:id", component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
