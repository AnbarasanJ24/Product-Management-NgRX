import { createAction, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Product } from "../product";
import * as AppState from '../../state/app.state';
import * as ProductActions from './product.actions'
import { stat } from "node:fs";


export interface State extends AppState.State{
    products : ProductState
}

export interface ProductState{
    showProductCode: boolean,
    currentProduct : Product,
    products : Product[],
    error : string
}

const initialState : ProductState = {
    showProductCode: true,
    currentProduct : null,
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
            currentProduct : action.product
        }
    }),
    on(ProductActions.clearCurrentProduct, (state:ProductState):ProductState =>{
        return {
            ...state,
            currentProduct : null
        }
    }),
    on(ProductActions.initilalizeCurrentProduct, (state):ProductState =>{
        return {
            ...state,
            currentProduct :{
                id :0,
                productName :"",
                productCode : "New",
                description : '',
                starRating :0 
            }
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
    })
)