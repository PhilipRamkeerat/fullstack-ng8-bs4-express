import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import Product from '../Product';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;
  constructor(private fb: FormBuilder, private ps: ProductsService, private router: Router) {
    this.createProductForm();
  }

  createProductForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', Validators.required]
    });
  }

  addProduct(product: Product) {
    this.ps.addProduct(this.productForm.value).subscribe(
      _ => {
        this.router.navigate(['products']);
      });
  }


  ngOnInit() {

  }

}
