import bugReducer from './bugSlice';
//import bugReducer, { getBugsAsync } from './bugSlice';
import userReducer from './userSlice';
import { configureStore } from '@reduxjs/toolkit';

import { bugsApi } from './bugsApi';

//includes api in the store to access api servicel
const store = configureStore({
  reducer: {
    bugs: bugReducer,
   [bugsApi.reducerPath]: bugsApi.reducer,
    users: userReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(bugsApi.middleware)
  }
})

//store.dispatch(getBugsAsync())

export default store;