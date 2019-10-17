import { Component, OnInit, AfterViewInit } from '@angular/core';
import Product from '../Product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.scss']
})
export class ProductGetComponent implements OnInit, AfterViewInit {
  products: Product[];
  constructor(private ps: ProductsService) { }

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.getProducts();
  }

  deleteProduct(id) {
    this.ps.deleteProduct(id).subscribe(res => {
      this.products.splice(id, 1);
    });
  }

  getProducts() {
    this.ps
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }
}
