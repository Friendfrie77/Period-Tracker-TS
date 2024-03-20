import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import userSlicereducer from './features/users/userSlice'
import modalsSlicereducer from "./features/modals/modalsSlice";
import loadingSlicereducer from "./features/loading/loadingSlice";
const persistConfig = { key: "root", storage, version: 1 };

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userSlicereducer),
  modal: modalsSlicereducer,
  loading: loadingSlicereducer
});
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export {store}