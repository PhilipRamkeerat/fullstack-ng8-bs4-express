import { Component, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, AfterContentInit, OnDestroy } from '@angular/core';
import Product from '../Product';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-get',
  templateUrl: './product-get.component.html',
  styleUrls: ['./product-get.component.scss']
})
export class ProductGetComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  productLenght: any;
  config: any;
  searchWord: any;
  searchNotFound = false;
  isSearch = false;

  constructor(private productService: ProductsService, private router: Router) {
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

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(res => {
      this.getProducts();
    });
  }

  getProducts() {
    if (this.isSearch) { this.isSearch = false; }

    this.productService.getProducts()
      .subscribe((product: Product[]) => {
        console.log('getProducts', this.products);
        this.products = product;
        this.productLenght = product.length;
      });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  searchProduct(word: string) {
    word = this.searchWord;
    this.isSearch = true;
    if (!word) {
      this.getProducts();
    } else {
      this.productService.searchProduct(word).subscribe(
        data => {
          this.products = data;
          console.log('Data', data.length);
          if (data.length === 0) {
            this.searchNotFound = true;
          } else {
            this.searchNotFound = false;
          }
        }
      );
    }
  }

  // Remove error msg and list all products
  getAllProducts() {
    this.searchNotFound = false;
    this.getProducts();
  }

}
