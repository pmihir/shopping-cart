import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../Services/common.service';
import { PaginationService } from '../Services/pagination.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<any>;
  pager: any = {};
  displayProduct: Array<any>;
  selectedIndex: number = 0;
  searchText: string;
  @ViewChild("closebutton") closebutton;
  displayBasic: boolean = true;
  myForm: FormGroup;
  editFlag: boolean = false;
  tempProductId: any;

  //   params = {
  //     Bucket: 'tempbucketproductimages',
  //     Key: this.FOLDER + file.name,
  //     Body: file,
  //     ACL: 'public-read',
  //     ContentType: contentType
  // };



  constructor(private commonService: CommonService, private paginationService: PaginationService, private fb: FormBuilder) { }



  ngOnInit(): void {
    this.getProductDetails();
    this.initializeForm();
  }

  // getImage(key) {
  //   const awsConfig = new AWS.Config({
  //     accessKeyId: '*******',
  //     secretAccessKey: '******',
  //     region: 'ap-south-1'
  //   })
  //   const s3 = new S3(awsConfig);

  //   const urlParams = {
  //     Bucket: '*****',
  //     Key: '*****',
  //   };

  //   return new Promise((resolve, reject) => {
  //     s3.getSignedUrl('getObject', urlParams, (err, url) => {
  //       if (err) { console.log(err); reject(err) }
  //       else resolve(url);
  //     });
  //   });
  // }
  getProductDetails() {
    this.commonService.getProductDetails().subscribe((res) => {
      this.products = res;
      this.displayProduct = res;
      this.setPage(1);
    }, (err) => {
      console.log(err);
    });
  }
  setPage(page: number) {
    this.pager = this.paginationService.getPager(this.products.length, page);
    this.displayProduct = this.products.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  setIndex(index: number) {
    this.selectedIndex = index;
  }

  initializeForm() {
    this.myForm = this.fb.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", Validators.required],
      price: ["", Validators.required],
      netPrice: ["", Validators.required],
      brand: ["", Validators.required],
      discount: ["", Validators.required],
    });
  }

  showModal() {
    this.displayBasic = true;
  }

  updateProductDetails(product) {
    this.myForm.patchValue({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      netPrice: product.netPrice,
      brand: product.brand,
      discount: product.discount
    });
    this.tempProductId = product._id;
    this.editFlag = true;
    this.showModal();
  }

  onSubmit(myForm) {
    let productObj: any = {};
    productObj.name = myForm.get("name").value;
    productObj.category = myForm.get("category").value;
    productObj.description = myForm.get("description").value;
    productObj.price = myForm.get("price").value;
    productObj.netprice = myForm.get("netPrice").value;
    productObj.brand = myForm.get("brand").value;
    this.closebutton.nativeElement.click();
    if (this.editFlag == true && this.tempProductId != null) {
      productObj._id = this.tempProductId;
      this.commonService.editProductDetail(productObj).subscribe((res) => {
        this.editFlag = false;
        this.tempProductId = null;
        this.getProductDetails();
      }, (err) => {
        console.log(err);
      })
    } else {
      this.commonService.addProduct(productObj).subscribe(
        (success) => {
          this.getProductDetails();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteProduct(productId: any) {
    this.commonService.deleteProduct(productId).subscribe(() => {
      this.getProductDetails();
    }, (err) => {
      console.log(err);
    })
  }

}
