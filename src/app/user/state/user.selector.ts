import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer";

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    userState => userState.maskUserName
)

export const getCurrentUser = createSelector(
    getUserFeatureState,
    userState => userState.currentUser
)