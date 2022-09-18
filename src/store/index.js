import bugReducer from './bugSlice';
//import bugReducer, { getBugsAsync } from './bugSlice';
import userReducer from './userSlice';
import { configureStore } from '@reduxjs/toolkit';


import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'

import { bugsApi } from './bugsApi';

const persistConfig = {
   key: 'root',
   version: 1,
   storage, 
}

const reducer = combineReducers({
    bugs: bugReducer,
    users: userReducer,
   [bugsApi.reducerPath]: bugsApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)


//includes api in the store to access api servicel
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(bugsApi.middleware)
  }
})

//store.dispatch(getBugsAsync())

export default store;