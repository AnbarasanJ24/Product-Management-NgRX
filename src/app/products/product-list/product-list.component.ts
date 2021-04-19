import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { State } from '../state/product.reducer';
import { getCurrentProduct, getError, getProducts, getShowProductCode } from '../state/product.selector';
import * as ProductActions from '../state/product.actions'


@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private productService: ProductService,
    private store : Store<State>) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // )


    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    this.displayCode$ = this.store.select(getShowProductCode)
    this.products$ = this.store.select(getProducts);
    this.store.dispatch(ProductActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.errorMessage$ = this.store.select(getError);

    
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode())
    // this.displayCode = !this.displayCode;
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initilalizeCurrentProduct())
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({product}))
    // this.productService.changeSelectedProduct(product);
  }

}
