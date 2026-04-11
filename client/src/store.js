import { configureStore } from "@reduxjs/toolkit";
import { api } from "./store/apiSlice";
import themeReducer from "./store/themeSlice";
import bookmarkReducer from "./store/bookmarkSlice";
import authReducer from "./store/authSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    theme: themeReducer,
    bookmark: bookmarkReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    api.middleware,
  ],
});

export default store;
