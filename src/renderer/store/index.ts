import { configureStore } from '@reduxjs/toolkit';
import GeneralReducer from './reducers/general';

export const store = configureStore({
  reducer: {
    general: GeneralReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
