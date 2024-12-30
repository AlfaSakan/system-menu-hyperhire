import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice.store";
import { menuService } from "@/service/api/menu.service";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [menuService.reducerPath]: menuService.reducer,
  },
  middleware: (getDetaultMiddleware) =>
    getDetaultMiddleware().concat(menuService.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
