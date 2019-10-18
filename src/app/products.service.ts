import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import Product from './Product';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  uri = 'http://localhost:4000/products';
  private productUrl = 'http://localhost:4000/products';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'Application/json' })
  };

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl).pipe(
      tap(_ => console.log('Fetched products')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  /**
   * Get product by id, and protect 404 page if id not found
   * (Don't show 404 page)
   * @param id identifier product
   */
  getProductNo404<Data>(id: number): Observable<Product> {
    const url = `${this.productUrl}/?id=${id}`;
    return this.http.get<Product[]>(url)
      .pipe(
        map(products => products[0]),
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} product id = ${id}`);
        }),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  // Get product by id
  getProduct(id: number): Observable<Product> {
    const url = `${this.productUrl}/edit/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`Fetched product id = ${id}`)),
      catchError(this.handleError<Product>(`error on getProduct id=${id}`))
    );
  }

  // TODO: Search Service
  searchProduct(term: string): Observable<Product[]> {
    if (!term.trim()) {
      return of([]); // Return empty product array
    }

    return this.http.get<Product[]>(`${this.productUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}" `)),
      catchError(this.handleError<Product[]>('error searchProducts', []))
    );
  }

  // Post new product
  addProduct(productName: string, productDescription: string, productPrice: number): Observable<Product> {
    const url = `${this.productUrl}/add`;
    const productObj = {
      productName,
      productDescription,
      productPrice
    };
    console.log('productObj', productObj);

    return this.http.post<Product>(url, productObj, this.httpOptions).pipe(
      tap((newProduct: Product) => this.log(`added product w/ id=${newProduct._id}`)),
      catchError(this.handleError<Product>(`Error on addProduct`))
    );
  }

  // Update product
  updateProduct(productName: string, productDescription: string, productPrice: number, id: any): Observable<any> {
    const url = `${this.productUrl}/update/${id}`;

    // Validating values
    productName = String(productName);
    productDescription = String(productDescription);
    productPrice = Number(productPrice);

    const obj = {
      productName,
      productDescription,
      productPrice
    };

    return this.http.put(url, obj).pipe(
      tap(_ => this.log(`updated product id ${id}`)),
      catchError(this.handleError<any>('error updateProduct'))
    );
  }

  editProduct(id) {
    return this
      .http
      .get(`${this.uri}/edit/${id}`);
  }

  deleteProduct(id: any): Observable<Product> {
    const url = `${this.productUrl}/delete/${id}`;

    console.log('url do deleteProduct', url);
    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`updated product id = ${id}`)),
      catchError(this.handleError<any>('error on deleteProduct'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log product */
  private log(message: string) {
    console.log(message);
  }

}
