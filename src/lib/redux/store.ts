import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// @ts-ignore
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import bottomBarReducer from "@/lib/redux/slices/bottom-bar";

const createNoopStorage = () => {
    return {
        getItem() {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: number) {
            return Promise.resolve(value);
        },
        removeItem() {
            return Promise.resolve();
        },
    };
};

export const storage =
    typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();



const rootReducer = combineReducers({
    bottomBar: bottomBarReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;