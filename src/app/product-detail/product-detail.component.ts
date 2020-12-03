import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: any = {};

  constructor(private commonService: CommonService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productDetails(this.route.snapshot.params['id']);
  }

  productDetails(id) {
    this.commonService.productDetail(id).subscribe((res) => {
      this.product = res;
    }, (err) => {
      console.log(err);
    })
  }

}
