import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import { Product } from '../product';
import { State } from '../state/product.reducer';
import { getCurrentProduct, getError, getProducts, getShowProductCode } from '../state/product.selector';
import * as ProductActions from '../state/product.actions'


@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;


  constructor(private store : Store<State>) { }

  ngOnInit(): void {
    this.displayCode$ = this.store.select(getShowProductCode)
    this.products$ = this.store.select(getProducts);
    this.store.dispatch(ProductActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.errorMessage$ = this.store.select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode())
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initilalizeCurrentProduct())
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:product.id}))
  }
}
