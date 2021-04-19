import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode  = createSelector(
    getProductFeatureState,
    productState => productState.showProductCode
)

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    productState => productState.currentProduct
)
 
export const getProducts = createSelector(
    getProductFeatureState,
    productState => productState.products
)

export const getError = createSelector(
    getProductFeatureState,
    productState => productState.error 
)