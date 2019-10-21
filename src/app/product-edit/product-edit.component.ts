import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import Product from '../Product';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  angForm: FormGroup;
  product: any = {};

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', Validators.required]
    });
  }

  updateProduct(product: Product) {
    this.route.params.subscribe(params => {
      this.productService.updateProduct(this.angForm.value, params.id).subscribe(
        _ => {
          this.router.navigate(['products']);
        });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idProduct = 'id';
      this.productService.editProduct(params[idProduct]).subscribe(res => {
        this.product = res;
      });
    });
  }

}
