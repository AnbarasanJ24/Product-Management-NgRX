import { createAction, createReducer, on } from "@ngrx/store";
import { User } from "../user";
import * as AppState from '../../state/app.state'
import * as UserActions from './user.actions'

export interface UserState{
    maskUserName : boolean,
    currentUser : User
}

export interface State extends AppState.State{
    user : UserState
} 

export const initialState: UserState = {
    maskUserName : true,
    currentUser : null
}

export const userReducer = createReducer(
    initialState,
    on(UserActions.maskUserName,
     (state:UserState)=>{
         console.log("Inside User Reducer", state)
         return {
             ...state,
             maskUserName : !state.maskUserName
         }
    })
)