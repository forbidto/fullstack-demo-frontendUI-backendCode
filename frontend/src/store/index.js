import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import userAuthReducer from "./reducers/authReducer";
import sellHomeForm3Reducer from "./reducers/sellHomeForm3Reducer";
import adminPendingListingReducer from "./reducers/adminPendingListingReducer";
import myListingReducer from "./reducers/myListingReducer";


const persistConfig = {
    key: "root",
    storage, // This defaults to localStorage
  };

  const rootReducer = combineReducers({
    userAuth: userAuthReducer,
    form3Input: sellHomeForm3Reducer,
    pendingListingsCache: adminPendingListingReducer,
    myListings: myListingReducer,
    myListingOwners:myListingReducer
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
  });


  export const persistor = persistStore(store);

/* export const store = configureStore({
    reducer:{
        userAuth:userAuthReducer ,
        form3Input:sellHomeForm3Reducer,
        pendingListingsCache: adminPendingListingReducer
    }
}) */