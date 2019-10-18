import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  angForm: FormGroup;
  product: any = {};
  productId = 0;

  constructor(private route: ActivatedRoute, private router: Router, private ps: ProductsService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', Validators.required]
    });
  }

  updateProduct(productName: string, productDescription: string, productPrice: number, id: any) {
    this.route.params.subscribe(params => {
      this.productId = params.id;
    });

    this.ps.updateProduct(productName, productDescription, productPrice, this.productId).subscribe(
      _ => {
        this.router.navigate(['products']);
      });
  }



  ngOnInit() {
    this.route.params.subscribe(params => {
      const idProduct = 'id';
      this.ps.editProduct(params[idProduct]).subscribe(res => {
        this.product = res;
      });
    });
  }

}
