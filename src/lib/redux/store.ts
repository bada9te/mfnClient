import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
// @ts-ignore
import bottomBarReducer from "@/lib/redux/slices/bottom-bar";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";


const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    bottomBar: bottomBarReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;