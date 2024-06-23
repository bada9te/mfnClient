import {applyMiddleware, combineReducers, compose, configureStore, Tuple} from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// @ts-ignore
import bottomBarReducer from "@/lib/redux/slices/bottom-bar";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import {persistReducer} from "redux-persist";
// @ts-ignore
import * as asyncInitialState from 'redux-async-initial-state';
import {httpGetCurrentUser} from "@/utils/http-requests/auth";
import userReducer from "@/lib/redux/slices/user";

interface NoopStorageReturnType {
    getItem: (_key: any) => Promise<null>
    setItem: (_key: any, value: any) => Promise<any>
    removeItem: (_key: any) => Promise<void>
}

const createNoopStorage = (): NoopStorageReturnType => {
    return {
        getItem(_key: any): Promise<null> {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any): Promise<any> {
            return Promise.resolve(value);
        },
        removeItem(_key: any): Promise<void> {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window !== 'undefined'
        ? createWebStorage('local')
        : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer,
    bottomBar: bottomBarReducer,
    asyncInitialState: asyncInitialState.innerReducer,
});


const loadStore = async(getCurrentState: any) => {
    return new Promise(resolve => {
        httpGetCurrentUser()
            .then(response => response.data)
            .then(user => {
                resolve({
                    // reuse state that was before loading current user
                    ...getCurrentState(),
                    // and replace only `user` key
                    user: {
                        user
                    },
                })
            })
            .catch(err => {
                console.log("Initial state can not be loaded:", err.message);
                resolve({...getCurrentState()});
            });
    });
};

//const persistedReducer = persistReducer(persistConfig, rootReducer);


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