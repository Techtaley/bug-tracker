import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store  from './store/index';

import {PersistGate} from 'redux-persist/integration/react'
//import storage from 'redux-persist/lib/storage';

import {persistStore} from 'redux-persist'

const persistor = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>	
       <App />
    </PersistGate>
  </Provider>
)
  

