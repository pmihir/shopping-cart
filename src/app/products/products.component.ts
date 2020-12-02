import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<any>;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("token"));
    this.commonService.getProductDetails().subscribe((res) => {
      console.log(res);
      this.products = res;
    }, (err) => {
      console.log(err);
    })
  }

}
