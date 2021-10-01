import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

export const selectApp =
  createFeatureSelector<AppState>('app');

export const selectUsers = createSelector(
  selectApp,
  (state: AppState) => state.users
)
