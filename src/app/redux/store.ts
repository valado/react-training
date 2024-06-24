import { configureStore } from '@reduxjs/toolkit';
import { issueTrackerSlice } from '../issues/slice';
import logger from 'redux-logger';
import { environment } from 'src/environments/environment';

export const store = configureStore({
  reducer: {
    issueTracker: issueTrackerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    environment.production
      ? getDefaultMiddleware()
      : getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
