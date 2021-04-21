import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducer";

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    productState => productState.showProductCode
)

export const getCurrentProductId = createSelector(
    getProductFeatureState,
    productState => productState.currentProductId
)

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (productState, currentProductId) => {
        if (currentProductId === 0) {
            return {
                id: 0,
                productName: "",
                productCode: "New",
                description: '',
                starRating: 0
            }
        }else{
            return currentProductId ? productState.products.find(product=> product.id === currentProductId) : null;
        }
    }
)

export const getProducts = createSelector(
    getProductFeatureState,
    productState => productState.products
)

export const getError = createSelector(
    getProductFeatureState,
    productState => productState.error
)