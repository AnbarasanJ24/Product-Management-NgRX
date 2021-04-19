import { createAction, props } from "@ngrx/store";
import { Product } from "../product";

export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);

export const setCurrentProduct = createAction(
    '[Product] Set Current Product',
    props<{ product: Product }>()
)

export const clearCurrentProduct = createAction(
    '[Product] Clear Current Product'
)

export const initilalizeCurrentProduct = createAction(
    '[Product] Initialize Current Product'
)

export const loadProducts = createAction(
    '[Product] Load'
)

export const loadProductSuccess = createAction(
    '[Product] Load Sucess',
    props<{products: Product[]}>()
)

export const loadProductsFail = createAction(
    '[Product] Load Fail',
    props<{error:string}>()
)
