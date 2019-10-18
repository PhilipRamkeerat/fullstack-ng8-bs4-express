import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, AfterContentInit, OnDestroy } from '@angular/core';
import Product from '../Product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.scss']
})
export class ProductGetComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[];
  productLenght: any;
  config: any;
  constructor(private ps: ProductsService) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.productLenght
    };
  }

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    this.getProducts();
  }

  deleteProduct(id) {
    this.ps.deleteProduct(id).subscribe(res => {
      this.getProducts();
    });
  }

  getProducts() {
    this.ps
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
        this.productLenght = data.length;
        console.log(this.products);
      });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }
}
