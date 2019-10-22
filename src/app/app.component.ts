import { Component } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng8-mongo-express-crud';
  products: any;
  searchWord: any;
  constructor(private productService: ProductsService) {

  }

  searchProduct(word: string) {
    word = this.searchWord;
    this.productService.searchProduct(word).subscribe(
      data => {
        console.log('Debugger', data);
        this.products = data;
      });
  }
}
