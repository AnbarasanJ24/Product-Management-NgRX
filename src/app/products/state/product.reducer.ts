import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions'


export interface State extends AppState.State{
    products : ProductState
}

export interface ProductState{
    showProductCode: boolean,
    currentProductId : number | null,
    products : Product[],
    error : string
}

const initialState : ProductState = {
    showProductCode: true,
    currentProductId : null,
    products : [],
    error : ''
}

export const productReducer = createReducer(
    initialState,
    on(ProductActions.toggleProductCode, (state) => {
        console.log({ state })
        return {
            ...state,
            showProductCode: !state.showProductCode
        };
    }),
    on(ProductActions.setCurrentProduct, (state,action)=>{
        return {
            ...state,
            currentProductId : action.currentProductId
        }
    }),
    on(ProductActions.clearCurrentProduct, (state:ProductState):ProductState =>{
        return {
            ...state,
            currentProductId : null
        }
    }),
    on(ProductActions.initilalizeCurrentProduct, (state):ProductState =>{
        return {
            ...state,
            currentProductId : 0
           
        }
    }),
    on(ProductActions.loadProductSuccess, (state,action):ProductState=>{
        return {
            ...state,
            products : action.products,
            error : ''
        }
    }),
    on(ProductActions.loadProductsFail, (state,action): ProductState=>{
        return {
            ...state,
            error : action.error
        }        
    }),
    on(ProductActions.updateProductSuccess, (state,action)=>{
        const updateProduct = state.products.map(
            product => product.id === action.product.id ? action.product : product
        )
        return {
            ...state,
            products: updateProduct,
            currentProductId : action.product.id,
            error :''
        }
    }),
    on(ProductActions.updateProductFail , (state,action)=>{
        return {
            ...state,
            error : action.error
        }
    })
)