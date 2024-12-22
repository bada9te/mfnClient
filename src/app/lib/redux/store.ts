"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import bottomBarReducer from "./slices/bottom-bar";
import { persistReducer } from "redux-persist";
// @ts-ignore
import * as asyncInitialState from "redux-async-initial-state";
import { httpGetCurrentUser } from "@/app/utils/http-requests/auth";
import userReducer from "./slices/user";
import playerReducer from "./slices/player";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { deleteCookie, setCookie } from "cookies-next";
import envCfg from "@/app/config/env";
import { disconnect } from "@wagmi/core";
import { config } from "../rainbowkit/config";

const createNoopStorage = () => ({
  getItem(_key: any) {
    return Promise.resolve(null);
  },
  setItem(_key: any, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: any) {
    return Promise.resolve();
  },
});

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const userPersistConfig = {
  key: "user",
  storage,
};

const playerPersistConfig = {
  key: "player",
  storage,
};

const basicReducerUsedForTypes = {
  user: persistReducer(userPersistConfig, userReducer),
  bottomBar: bottomBarReducer,
  player: persistReducer(playerPersistConfig, playerReducer),
};

// Combine reducers
const rootReducer = combineReducers({
  ...basicReducerUsedForTypes,
  asyncInitialState: asyncInitialState.innerReducer,
});

const loadStore = async (getCurrentState: any) => {
  return new Promise((resolve) => {
    httpGetCurrentUser()
      .then((response) => response.data)
      .then((userData) => {
        setCookie(envCfg.userIdCookieKey as string, userData.user._id);
        resolve({
          ...getCurrentState(),
          user: {
            ...userData,
          },
        });
      })
      .catch(() => {
        disconnect(config)
          .then(() => {
            console.log("Wallet disconnected");
          })
          .catch(() => {
            console.log("Wallet disconnection failed");
          });
        deleteCookie(envCfg.userIdCookieKey as string);
        resolve({ ...getCurrentState(), user: { user: null } });
      });
  });
};

export const store = configureStore({
  reducer: asyncInitialState.outerReducer(rootReducer),
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      asyncInitialState.middleware(loadStore)
    ),
});


// Used for providing types
const makeTypedStore = () => configureStore({
    reducer: basicReducerUsedForTypes
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeTypedStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
