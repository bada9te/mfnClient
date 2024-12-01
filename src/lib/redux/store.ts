"use client"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// @ts-ignore
import bottomBarReducer from "@/lib/redux/slices/bottom-bar";
import {persistReducer} from "redux-persist";
// @ts-ignore
import * as asyncInitialState from 'redux-async-initial-state';
import {httpGetCurrentUser} from "@/utils/http-requests/auth";
import userReducer from "@/lib/redux/slices/user";
import playerReducer from "@/lib/redux/slices/player";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { deleteCookie, setCookie } from "cookies-next";
import envCfg from "@/config/env";
import { disconnect } from '@wagmi/core'
import { config } from "@/config/wagmi";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key:any, value:any) {
            return Promise.resolve(value);
        },
        removeItem(_key:any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();


const userPersistConfig = {
    key: 'user',
    storage,
};

const playerPersistConfig = {
    key: 'player',
    storage,
}

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    bottomBar: bottomBarReducer,
    player: persistReducer(playerPersistConfig, playerReducer),
    asyncInitialState: asyncInitialState.innerReducer,
});


const loadStore = async(getCurrentState: any) => {
    return new Promise(resolve => {
        httpGetCurrentUser()
        .then(response => response.data)
        .then(userData => {
            setCookie(envCfg.userIdCookieKey as string, userData.user._id);
            resolve({
                // reuse state that was before loading current user
                ...getCurrentState(),
                // and replace only `user` key
                user: {
                    ...userData
                },
            })
        })
        .catch(err => {
            disconnect(config).then(() => {
                console.log("Wallet disconnected");
            }).catch(() => {
                console.log("Wallet disconnection failed");
            });
            deleteCookie(envCfg.userIdCookieKey as string);
            //console.log(err)
            // console.log("Initial state can not be loaded:", err.message);
                resolve({...getCurrentState(), user: {user: null}});
            });
    });
};


export const store = configureStore({
    reducer: asyncInitialState.outerReducer(rootReducer),
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(asyncInitialState.middleware(loadStore))
});



export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;