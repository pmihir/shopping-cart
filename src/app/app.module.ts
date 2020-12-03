import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProductsComponent } from './products/products.component';
import { SearchPipe } from './products/search.pipe';
import { ProductDetailComponent } from './product-detail/product-detail.component';
// import { DataViewModule } from 'primeng/dataview';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    SearchPipe,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
